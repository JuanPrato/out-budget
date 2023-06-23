import { IncomeInput, IncomeButton } from "@/app/Inputs";
import { useForm } from "react-hook-form";
import { Button } from "./Button";
import { useState } from "react";

interface Props {
  onSubmit: (values: Form) => Promise<void>;
}

interface Form {
  value: number;
  income: boolean;
}

export default function MainForm({ onSubmit }: Props) {

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<Form>();
  const [loading, setLoading] = useState(false);

  async function onSubmitLocal(values: Form) {
    if (loading) return;
    setLoading(true);
    await onSubmit(values);
    reset();
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitLocal)}
      className="grid grid-cols-6 gap-4 w-full"
    >
      <IncomeInput register={register("value", { required: true, min: 1, valueAsNumber: true })} error={!!errors.income} />
      <IncomeButton
        register={register("income")}
        value={watch("income")}
        setValue={(v: boolean) => setValue("income", v)}
      />
      <Button className="col-span-3" bgColor="bg-secondary" disabled={loading}>GUARDAR</Button>
    </form>
  );
}