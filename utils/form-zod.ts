import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, useForm } from "react-hook-form"

export const useFormHook = (schema: any) => {
  const formValues: FieldValues = useForm({
    resolver: zodResolver(schema),
    
  })
  return formValues
}
