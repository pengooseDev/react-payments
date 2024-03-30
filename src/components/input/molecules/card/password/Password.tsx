import { Input } from '@/components/input/Input';
import { INPUT } from '@/components/input/input.constant';
import { CardInputProps } from '../cardInput.type';
import { CardForm } from '@/pages/Payments/payments.type';

export const Password = ({
  formMethods,
  autoFocusMethods,
  fields,
}: CardInputProps<CardForm>) => {
  const { register, errors } = formMethods;
  const { autoFocusRefs, handleAutoFocus } = autoFocusMethods;

  const fieldKeys = Object.values(fields.FIELDS)
    .filter(({ readOnly }) => !readOnly)
    .map(({ name }) => name);
  const fieldsFulfilled = Object.values(fieldKeys).map((key) => !errors[key]);
  const fieldErrors = Object.values(fieldKeys)
    .map((key) => errors[key])
    .filter((error) => error);
  const allFieldsFulfilled = fieldsFulfilled.every((field) => field);
  const optionalClassName = allFieldsFulfilled ? 'text-fulfilled' : '';

  return (
    <Input.Container>
      <Input.Title>
        <span>{fields.TITLE}</span>
        <Input.Error errors={fieldErrors} />
      </Input.Title>
      {Object.values(fields.FIELDS).map(
        ({
          name,
          type,
          validate,
          maxLength,
          readOnly,
          defaultValue,
          autoFocusIndex,
        }) => (
          <Input
            key={name}
            type={type}
            ref={autoFocusIndex ? autoFocusRefs[autoFocusIndex] : null}
            {...register(name, {
              maxLength,
              validate,
              readOnly,
              defaultValue,
              onChange: (value: string) => {
                const parsedValue = value.replace(INPUT.REGEX.DIGIT, '');

                if (maxLength && autoFocusIndex) {
                  handleAutoFocus({
                    value: parsedValue,
                    index: autoFocusIndex,
                    maxLength,
                  });
                }

                return parsedValue;
              },
            })}
            className={`w-15 ${optionalClassName} ${
              readOnly ? 'input-readonly' : ''
            }`}
          />
        )
      )}
    </Input.Container>
  );
};
