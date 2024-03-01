import { Input } from '@/components/input/Input';
import { INPUT } from '@/components/input/input.constant';
import { useInputFields } from '@/hooks/useInputFields';
import { EXPIRE_DATE } from './expireDate.constant';

export const ExpireDate = () => {
  const { fields, autoFocusRefs, onFieldChange, fieldsFulfilled } =
    useInputFields(Object.values(EXPIRE_DATE.FIELDS));

  const optionalClassName = fieldsFulfilled.every((field) => field)
    ? 'text-fulfilled'
    : '';

  return (
    <Input.Container>
      <Input.Title>{EXPIRE_DATE.TITLE}</Input.Title>
      <Input.Box
        separator={{
          symbol: INPUT.BOX.SEPARATOR.SLASH,
          fieldsFulfilled,
        }}
        className='w-50'
      >
        {Object.values(EXPIRE_DATE.FIELDS).map((field, fieldIndex) => (
          <Input
            key={field.ID}
            type={field.TYPE}
            ref={autoFocusRefs[fieldIndex]}
            value={fields[fieldIndex]}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onFieldChange(event, fieldIndex)
            }
            placeholder={field.PLACEHOLDER}
            className={optionalClassName}
          />
        ))}
      </Input.Box>
    </Input.Container>
  );
};