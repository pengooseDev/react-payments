import { ModalItem } from '@/components/modal/atom/Modalitem';
import { Input } from '@/components/input/Input';
import { INPUT } from '@/components/input/input.constant';
import { CARD_COMPANY } from './company.constant';
import { CardInputFormMethods } from '../cardInput.type';
import { Dot } from '@/components/common/Dot';

interface CompanyProps {
  formMethods: CardInputFormMethods;
  closeModal: () => void;
}

export const Company = ({ formMethods, closeModal }: CompanyProps) => {
  const { register } = formMethods;

  return (
    <div className='modal-grid'>
      {Object.entries(CARD_COMPANY).map(([key, value]) => (
        <label key={key} htmlFor={key}>
          <Input
            type={INPUT.TYPE.RADIO}
            id={key}
            className='visually-hidden'
            {...register('company', {
              onChange: () => {
                closeModal();
                return key;
              },
            })}
          />
          <ModalItem
            key={key}
            name={value.name}
            topContent={<Dot color={value.color} />}
          />
        </label>
      ))}
    </div>
  );
};
