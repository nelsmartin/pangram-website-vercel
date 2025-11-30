



const NUMBER_WORDS: { [key: number]: string } = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  18: "eighteen",
  19: "nineteen",
  20: "twenty",
  21: "twenty-one",
  22: "twenty-two",
  23: "twenty-three",
  24: "twenty-four",
  25: "twenty-five",
  26: "twenty-six",
  27: "twenty-seven",
  28: "twenty-eight",
  29: "twenty-nine",
  30: "thirty",
  31: "thirty-one",
  32: "thirty-two",
  33: "thirty-three",
  34: "thirty-four",
  35: "thirty-five",
  36: "thirty-six",
};

export function pangramToSentence(prefix : String, charCounts: number[]) {

    let result = prefix + " "

    for (let i = 0; i < charCounts.length; i++) {

        result += NUMBER_WORDS[charCounts[i]] + " "
        result += String.fromCharCode(65 + i)
        if (charCounts[i] > 1){
            result += "s"
        }
        result += ", "

    }

    return result

}


