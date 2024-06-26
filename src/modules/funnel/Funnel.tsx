import { createContext, useContext, useState } from 'react';
import { FUNNEL } from './funnel.constant';
import {
  GetFunnelProps,
  FunnelContextProps,
  FunnelStepProps,
} from './funnel.type';

/**
 * Funnel을 생성하는 함수
 * @template StepKey - Step의 name들의 유니온 타입
 * @template Data - Funnel에서 공유할 데이터의 타입
 * @param {GetFunnelProps<StepKey, Data>} param0 - 초기 Step
 * @returns {{
 *  Funnel: React.FC<React.PropsWithChildren<{}>>;
 *  useFunnel: () => FunnelContextProps<StepKey, Data>;
 * }}
 */
export const createFunnel = <StepKey, Data = undefined>({
  initialStep,
  initialData,
}: GetFunnelProps<StepKey, Data>) => {
  const FunnelContext = createContext<FunnelContextProps<StepKey, Data>>({
    step: initialStep,
    data: initialData,
    setStep: () => {
      throw new Error(FUNNEL.MESSAGE.ERROR.STEP_NOT_INITIALIZED);
    },
    setData: () => {
      throw new Error(FUNNEL.MESSAGE.ERROR.DATA_NOT_INITIALIZED);
    },
  });

  const Step = ({ name, children }: FunnelStepProps<StepKey>) => {
    const { step } = useContext(FunnelContext);

    if (name === step) return <>{children}</>;

    return null;
  };

  const FunnelContainer = ({ children }: React.PropsWithChildren) => {
    const [step, setStep] = useState<StepKey>(initialStep);
    const [data, setData] = useState<typeof initialData | undefined>(
      initialData
    );

    return (
      <FunnelContext.Provider value={{ data, setData, step, setStep }}>
        {children}
      </FunnelContext.Provider>
    );
  };

  return Object.assign(FunnelContainer, {
    Step,
    useContext: () => useContext(FunnelContext),
  });
};
