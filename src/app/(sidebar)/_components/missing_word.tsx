import { Input } from "~/components/ui/input";

export default function MissingWord({
  word,
  handleChange,
  invalid,
  disabled,
}: {
  word: string;
  handleChange: (value: string, letterIndex: number) => void;
  invalid: boolean;
  disabled: boolean;
}) {
  const splitWord = word.split("");

  return (
    <div className="flex gap-2" key={word}>
      {splitWord.map((letter, index) => {
        if (letter === "'")
          return (
            <div className="-translate-y-4" key={`${word}-${letter}`}>
              &apos;
            </div>
          );
        else if (letter === '"')
          return (
            <div className="-translate-y-4" key={`${word}-${letter}`}>
              &quot;
            </div>
          );
        else if (letter === "“" || letter === "”")
          return (
            <div className="-translate-y-4" key={`${word}-${letter}`}>
              &ldquo;
            </div>
          );
        else if (letter === "‘" || letter === "’")
          return (
            <div className="-translate-y-4" key={`${word}-${letter}`}>
              &lsquo;
            </div>
          );
        else if (letter === "—")
          return (
            <div className="-translate-y-4" key={`${word}-${letter}`}>
              &mdash;
            </div>
          );
        return (
          <Input
            className={`w-8 overflow-visible px-0 text-center ${invalid && "border-red-500"}`}
            key={`${word}-${letter}-${index}`}
            maxLength={1}
            disabled={disabled}
            onChange={(e) => {
              handleChange(e.target.value, index);

              if (e.target.value.length === e.target.maxLength) {
                let nextInput = e.target.nextElementSibling as HTMLInputElement;
                // If the next element is not an input, move to the next one
                while (nextInput && nextInput.tagName !== "INPUT") {
                  nextInput = nextInput.nextElementSibling as HTMLInputElement;
                }
                if (!nextInput) {
                  const parent = e.target.parentElement;
                  if (parent) {
                    const nextParent = parent.nextElementSibling as HTMLElement;
                    if (nextParent) {
                      nextInput =
                        nextParent.firstElementChild as HTMLInputElement;
                      // If the first child is not an input, move to the next one
                      while (nextInput && nextInput.tagName !== "INPUT") {
                        nextInput =
                          nextInput.nextElementSibling as HTMLInputElement;
                      }
                    }
                  }
                }
                if (nextInput) {
                  nextInput.focus();
                }
              }
            }}
            onKeyDown={(e) => {
              if (
                e.key === "Backspace" &&
                (e.target as HTMLInputElement).value === ""
              ) {
                let previousInput = (e.target as HTMLInputElement)
                  .previousElementSibling as HTMLInputElement;
                // If the previous element is not an input, move to the previous one
                while (previousInput && previousInput.tagName !== "INPUT") {
                  previousInput =
                    previousInput.previousElementSibling as HTMLInputElement;
                }
                if (!previousInput) {
                  const parent = (e.target as HTMLElement).parentElement!;
                  if (parent) {
                    const previousParent =
                      parent.previousElementSibling as HTMLElement;
                    if (previousParent) {
                      previousInput =
                        previousParent.lastElementChild as HTMLInputElement;
                      // If the last child is not an input, move to the previous one
                      while (
                        previousInput &&
                        previousInput.tagName !== "INPUT"
                      ) {
                        previousInput =
                          previousInput.previousElementSibling as HTMLInputElement;
                      }
                    }
                  }
                }
                if (previousInput) {
                  previousInput.focus();
                }
              }
            }}
          />
        );
      })}
    </div>
  );
}
