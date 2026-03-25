import json
import re
from pathlib import Path

import pdfplumber


NUMBER_RE = re.compile(r"^-?\d[\d,]*$")


def parse_int(s: str) -> int:
    return int(s.replace(",", ""))


def is_noise_line(line: str) -> bool:
    if not line:
        return True
    # Common headers / footers
    lower = line.lower()
    if lower in {
        "annex 1: population by caste/ethnicity and sex, nphc 2021",
        "population",
        "area caste/ethinicity",
        "total male female",
        "total",
        "male",
        "female",
        "caste/ethinicity",
        "caste/ethnicity",
    }:
        return True
    # Standalone page number like "86"
    if line.isdigit() and len(line) <= 4:
        return True
    return False


def try_parse_row(line: str):
    parts = line.split()
    if len(parts) < 4:
        return None
    if not (NUMBER_RE.match(parts[-1]) and NUMBER_RE.match(parts[-2]) and NUMBER_RE.match(parts[-3])):
        return None
    caste = " ".join(parts[:-3]).strip()
    if not caste:
        return None
    total = parse_int(parts[-3])
    male = parse_int(parts[-2])
    female = parse_int(parts[-1])
    return {"caste": caste, "total": total, "male": male, "female": female}


def extract(pdf_path: Path, start_page: int, end_page: int):
    # pages are 1-based in the user request; pdfplumber pages[] is 0-based
    start_idx = start_page - 1
    end_idx = end_page - 1

    results = []
    current = None

    with pdfplumber.open(str(pdf_path)) as pdf:
        for idx in range(start_idx, min(end_idx + 1, len(pdf.pages))):
            page = pdf.pages[idx]
            text = page.extract_text() or ""
            if not text.strip():
                continue
            lines = [ln.strip() for ln in text.splitlines()]
            i = 0
            while i < len(lines):
                line = lines[i]
                if is_noise_line(line):
                    i += 1
                    continue

                # District heading heuristic:
                # a line with no digits, and the next non-noise line starts with "All Castes"
                if not any(ch.isdigit() for ch in line):
                    j = i + 1
                    while j < len(lines) and is_noise_line(lines[j]):
                        j += 1
                    if j < len(lines) and lines[j].startswith("All Castes"):
                        # flush previous district
                        if current and current["data"]:
                            results.append(current)
                        current = {"district": line.title(), "data": []}
                        i = j
                        continue

                row = try_parse_row(line)
                if row and current is not None:
                    current["data"].append(row)

                i += 1

    if current and current["data"]:
        results.append(current)

    # Deduplicate districts in case headings repeat (keep first, append unique castes by name+numbers)
    merged = {}
    for d in results:
        name = d["district"]
        merged.setdefault(name, [])
        merged[name].extend(d["data"])

    final = []
    for name, rows in merged.items():
        seen = set()
        uniq = []
        for r in rows:
            key = (r["caste"], r["total"], r["male"], r["female"])
            if key in seen:
                continue
            seen.add(key)
            uniq.append(r)
        final.append({"district": name, "data": uniq})

    final.sort(key=lambda x: x["district"])
    return final


def main():
    repo = Path(__file__).resolve().parents[1]
    pdf_path = repo / "data" / "Caste_Ethnicity_report_NPHC_2021.pdf"
    out_path = repo / "src" / "data" / "casteEthnicityByDistrict.json"

    data = extract(pdf_path, start_page=36, end_page=190)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

    # Minimal sanity output
    print(f"Wrote {out_path} with {len(data)} districts")
    sample = next((d for d in data if d['district'].lower() == 'rautahat'), None)
    if sample:
        all_castes = next((r for r in sample["data"] if r["caste"] == "All Castes"), None)
        print("Rautahat All Castes:", all_castes)


if __name__ == "__main__":
    main()

