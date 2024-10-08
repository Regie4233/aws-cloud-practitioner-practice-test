'use client'
import { UserQuestionInput } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import MultipleSelect from "./MultipleSelect";
import { createAlphabetIndex } from "@/lib/helpers";
import { useHandleChangeAnswer } from "@/lib/fetchhooks";

function QuestionCard({ data }: { data: UserQuestionInput }) {
    const { updateState } = useHandleChangeAnswer();

    if (!data) return;
    return (
        <>
            <h6>Question {data.index + 1}</h6>
            <h4 className="font-medium md:text-xl">
                {
                    data.question.prompt
                }
            </h4>
            {
                data.question.correctAnswer.length > 1 ?
                    <MultipleSelect data={data} />
                    :
                    <RadioGroup
                        value={
                            data.selectedAnswer!.length > 0 ? 
                            data.selectedAnswer![0] : ''
                        }
                        onValueChange={(val) => updateState([val], data)}>
                        {
                            data.question.options.map((e, i) => (
                                <div key={i} className="flex items-center space-x-2">
                                    <RadioGroupItem value={createAlphabetIndex(i)} id={`r${i}`} />
                                    <Label htmlFor={`r${i}`}>{e}</Label>
                                </div>
                            ))
                        }
                    </RadioGroup>
            }
        </>
    )
}

export default QuestionCard