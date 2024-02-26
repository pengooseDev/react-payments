import { usePaymentsFunnel } from '../paments.context';
import { STEP } from '../payments.constant';
import { PaymentsStepKey } from '../payments.type';

export const CardList = () => {
  const { setStep } = usePaymentsFunnel();

  return (
    <div>
      <h1>Card List</h1>
      {Object.keys(STEP).map((key) => {
        return (
          <button
            key={key}
            onClick={() => setStep(STEP[key as PaymentsStepKey])}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};