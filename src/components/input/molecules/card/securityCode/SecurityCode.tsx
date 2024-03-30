import { Input } from '@/components/input/Input';
import { CardInputProps } from '../cardInput.type';
import { INPUT } from '@/components/input/input.constant';
import { SECURITY_CODE } from './securityCode.constant';

export const SecurityCode = ({
  formMethods,
  autoFocusMethods,
}: CardInputProps) => {
  const { register, errors } = formMethods;
  const { autoFocusRefs, handleAutoFocus } = autoFocusMethods;

  const fieldKeys = Object.values(SECURITY_CODE.FIELDS).map(({ name }) => name);
  const fieldsFulfilled = Object.values(fieldKeys).map((key) => !errors[key]);
  const fieldErrors = Object.values(fieldKeys)
    .map((key) => errors[key])
    .filter((error) => error);
  const allFieldsFulfilled = fieldsFulfilled.every((field) => field);
  const optionalClassName = allFieldsFulfilled ? 'text-fulfilled' : '';

  return (
    <Input.Container>
      <Input.Title>
        <span>{SECURITY_CODE.TITLE}</span>
        <Input.Error errors={fieldErrors} />
      </Input.Title>
      {Object.values(SECURITY_CODE.FIELDS).map(
        ({ name, type, validate, maxLength, placeholder, autoFocusIndex }) => (
          <Input
            key={name}
            type={type}
            placeholder={placeholder}
            className={`w-25 ${optionalClassName}`}
            ref={autoFocusIndex ? autoFocusRefs[autoFocusIndex] : null}
            {...register(name, {
              maxLength,
              validate,
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
          />
        )
      )}
    </Input.Container>
  );
};
