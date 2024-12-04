---
theme: shibainu
fonts:
    mono: "Roboto Mono"
---

# Palindromic DNA sequences

---

## Get sequence from user

```python {1-2}{lines:true}
def main():
    sequence = get_sequence()

    if sequence:
        lengths = get_min_and_max_lengths()
        out_file_path = get_out_file()

        palindromes = get_palindromes(sequence, **lengths)

        with open(out_file_path, "w", encoding="utf8") as out_file:
            print(*palindromes, sep="\n\n", file=out_file)
            print(f"Output has been written to {out_file_path}.")
    else:
        print("Failed to get DNA sequence.")


if __name__ == "__main__":
    main()
```

<!-- 
- The program starts by getting the sequence from the user.

-->

---

## Get input from user

```python {1|2-4,18|5-10|4,12-16|1,16,18}{lines:true}
def get_sequence() -> str | None:
    sequence_prompt = "Enter a DNA sequence or path to single-sequence DNA FASTA file: "

    while not (sequence := extract_seq_from_input(input(sequence_prompt))):
        print("Input type is not acceptable.")

        retry_prompt = "Would you like to retry? ([Y]/N) "

        while (should_retry := input(retry_prompt).upper()) not in "YN":
            continue

        match should_retry:
            case "Y" | "":
                continue
            case "N":
                return None

    return sequence
```

<!--
- This is done by the function "get_sequence".

[click]

- The function asks the user to enter either a DNA sequence, or a path to a file containing a DNA sequence.

- If the sequence can be successfully extracted from the user's input, the function returns the sequence.

- Otherwise, while the sequence cannot be extracted from the user input,

[click]

- we tell the user that the "Input type is not acceptable",
- then we ask them if they would like to retry.
- We repeat the inner while loop, asking them if they want to retry, until they enter 'Y' for yes, or 'N' for no. 

[click] 

- If the user chooses 'Y' or leaves it blank, we allow them to try to enter the sequence again by continuing the outer while loop.
- If the user chooses 'N', there is no sequence and os we return None.

[click]

- Thus, the function returns either None, or the sequence as a string.
-->

---

## Check input & extract DNA sequence

```python {1-3|6,17|7-8|9|10|12|11,13|14-15|11-13,15|6,17}{lines: true}
def is_dna(sequence: str) -> bool:
    sequence = sequence.upper()
    return bool(sequence) and set(sequence).issubset("ACGT")


def extract_seq_from_input(string: str) -> str | None:
    if string.endswith((".fa", ".fasta", ".fna")):
        fasta_file = string
        with open(fasta_file, "r", encoding="utf8") as f:
            lines = [line.strip() for line in f.readlines()]
            sequence = "".join(
                filter(lambda line: not line.startswith(">"), lines)
            ).upper()
    else:
        sequence = string

    return sequence if is_dna(sequence) else None
```
<!--
- After the user enters the input, we must check that the input is correct. If so, we extract the sequence from the input.

- We define a function called "is_dna", which checks whether a string is a DNA sequence.
- It does this by checking that the string is not empty, and that it only contains the letters A, C, G, or T.

[click]

- The "is_dna" function is used by the "extract_seq_from_input" function.

[click]

- This function checks if the user's input is a fasta file.
- It does this by checking if the string ends in a fasta file extension.
- If so, the string is the path to a fasta file.

[click]

- We can then open this fasta file

[click]

- and read the lines, stripping the newline characters.

[click]

- We then filter out all the lines that start with a '>',

[click]

- and concatenate the remaining lines to get the full sequence.

[click]

- If the string did not end with a fasta file extension, we assume that the user was attempting to enter the DNA sequence and not a file, so we just return the string.

[click]

- Thus, after extracting the sequence from the fasta file or user input directly,

[click]

the function returns a string if the sequence is a DNA sequence. Otherwise, it returns 'None'.

-->
---

## Continue the program if DNA sequence was extracted successfully

```python {1-4,13-14|4-5}{lines: true}
def main():
    sequence = get_sequence()

    if sequence:
        lengths = get_min_and_max_lengths()
        out_file_path = get_out_file()
        
        palindromes = get_palindromes(sequence, **lengths)

        with open(out_file_path, "w", encoding="utf8") as out_file:
            print(*palindromes, sep="\n\n", file=out_file)
            print(f"Output has been written to {out_file_path}.")
    else:
        print("Failed to get DNA sequence.")


if __name__ == "__main__":
    main()
```

---

## Ask user for min/max lengths

```python {1|2-7|9-10|12,19-20|13-17|3-7,22}{lines:true}
def get_min_and_max_lengths() -> dict[str, int | float]:

    lengths = {
        "min_palindrome_length": 4,
        "max_palindrome_length": 10,
        "max_spacer_fraction": 0.5,
    }

    for length, default_value in lengths.items():
        length_prompt = f"Please choose {length} [default: {default_value}]: "

        while not is_number(user_input := input(length_prompt)):
            if not user_input:
                break
            else:
                print("Please enter a numeric value.")
                continue

        if user_input:
            lengths[length] = float(user_input)

    return lengths
```

---

## Ask user for path to output file


```python {1,4,5|1,4,6}{lines: true}
def main():
    sequence = get_sequence()

    if sequence:
        lengths = get_min_and_max_lengths()
        out_file_path = get_out_file()
        
        palindromes = get_palindromes(sequence, **lengths)

        with open(out_file_path, "w", encoding="utf8") as out_file:
            print(*palindromes, sep="\n\n", file=out_file)
            print(f"Output has been written to {out_file_path}.")
    else:
        print("Failed to get DNA sequence.")


if __name__ == "__main__":
    main()
```

---

## Ask user for path to output file

```python {1|2|4-7|2,9}{lines:true}
def get_out_file() -> str:
    default_out_file = "palindromes.output.txt"

    prompt = f"Enter out_file_path [default: {default_out_file}]: "

    if out_file := input(prompt):
        return out_file

    return default_out_file
```

---

## Get palindromes from user sequence

```python {1,4,6,10|1,5,8}{lines: true}
def main():
    sequence = get_sequence()

    if sequence:
        lengths = get_min_and_max_lengths()
        out_file_path = get_out_file()
        
        palindromes = get_palindromes(sequence, **lengths)

        with open(out_file_path, "w", encoding="utf8") as out_file:
            print(*palindromes, sep="\n\n", file=out_file)
            print(f"Output has been written to {out_file_path}.")
    else:
        print("Failed to get DNA sequence.")


if __name__ == "__main__":
    main()
```

---

## Get palindromes from user sequence

```python {1-7|9|11-13|14-16|18-28|18-20,30|32-40|41-49|51|53}{lines:true,maxHeight:'450px'}
def get_palindromes(
    sequence: str,
    *,
    min_palindrome_length: int,
    max_palindrome_length: int,
    max_spacer_fraction: float,
) -> list[str]:

    palindromes = []

    sequence_length = len(sequence)

    for i in range(sequence_length):
        for j in range(i + int(min_palindrome_length), sequence_length + 1):
            subsequence = sequence[i:j]
            subsequence_rc = reverse_complement(subsequence)

            palindrome_head = ""
            spacer = ""
            palindrome_tail = ""

            for k in range(len(subsequence)):
                if subsequence[k] == subsequence_rc[k]:
                    palindrome_head += subsequence[k]
                else:
                    spacer = subsequence[k : len(subsequence) - k]
                    palindrome_tail += subsequence[len(subsequence) - k :]
                    break

            full_palindrome = palindrome_head + spacer + palindrome_tail

            if (
                palindrome_head
                and (
                    min_palindrome_length
                    <= len(full_palindrome)
                    <= max_palindrome_length
                )
                and len(spacer) / len(full_palindrome) <= max_spacer_fraction
            ):
                palindrome_start, palindrome_end = i, j - 1

                formatted_palindrome = format_palindrome(
                    palindrome_head,
                    spacer,
                    palindrome_tail,
                    palindrome_start,
                    palindrome_end,
                )

                palindromes.append(formatted_palindrome)

    return palindromes
```

---

## Print palindromes to output file

```python {1,4,8|1,10-11}{lines: true}
def main():
    sequence = get_sequence()

    if sequence:
        lengths = get_min_and_max_lengths()
        out_file_path = get_out_file()
        
        palindromes = get_palindromes(sequence, **lengths)

        with open(out_file_path, "w", encoding="utf8") as out_file:
            print(*palindromes, sep="\n\n", file=out_file)
            print(f"Output has been written to {out_file_path}.")
    else:
        print("Failed to get DNA sequence.")


if __name__ == "__main__":
    main()
```

---

## Format palindromes for easier interpretation

```python {1-3|4|6|8-18|20}{lines:true}
def format_palindrome(
    palindrome_head, spacer, palindrome_tail, palindrome_start, palindrome_end
) -> str:
    full_palindrome = palindrome_head + spacer + palindrome_tail

    bonds = "|" * len(palindrome_head) + "-" * len(spacer) + "|" * len(palindrome_tail)

    formatted_palindrome = "\n".join(
        [
            f"{palindrome_start}",
            "\u2193",
            full_palindrome,
            bonds,
            full_palindrome[::-1],
            f"{"\u2191":>{len(full_palindrome)}}",
            f"{palindrome_end:>{len(full_palindrome)}}",
        ],
    )

    return formatted_palindrome
```

---

## Notify user of success

```python {1,4,11-12}{lines: true}
def main():
    sequence = get_sequence()

    if sequence:
        lengths = get_min_and_max_lengths()
        out_file_path = get_out_file()
        
        palindromes = get_palindromes(sequence, **lengths)

        with open(out_file_path, "w", encoding="utf8") as out_file:
            print(*palindromes, sep="\n\n", file=out_file)
            print(f"Output has been written to {out_file_path}.")
    else:
        print("Failed to get DNA sequence.")


if __name__ == "__main__":
    main()
```

---

## Example output

```md {*}{maxHeight:'400px'}
0
↓
AGCT
||||
TCGA
   ↑
   3

2
↓
CTTCTGAAG
||||-||||
GAAGTCTTC
        ↑
       10

3
↓
TTCTGAA
|||-|||
AAGTCTT
      ↑
      9

4
↓
TCTGA
||-||
AGTCT
    ↑
    8

5
↓
CTGAAG
||--||
GAAGTC
     ↑
    10

7
↓
GAAGCTTC
||||||||
CTTCGAAG
       ↑
      14

8
↓
AAGCTT
||||||
TTCGAA
     ↑
    13

9
↓
AGCT
||||
TCGA
   ↑
  12

12
↓
TTCTGAA
|||-|||
AAGTCTT
      ↑
     18

13
↓
TCTGA
||-||
AGTCT
    ↑
   17

23
↓
TTGAA
||-||
AAGTT
    ↑
   27

23
↓
TTGAAA
||--||
AAAGTT
     ↑
    28

29
↓
GTAC
||||
CATG
   ↑
  32
```