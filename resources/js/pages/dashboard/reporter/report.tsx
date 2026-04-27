import { AnonymousCheck } from '@/components/reporter/anonymous-check';
import NewCase from '@/components/reporter/new-case';
import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';

const Dashboard = () => {
    const reportPreferenceContinue = useStepperFormStore(
        (state) => state.reportPreferenceContinue,
    );

    return <>{reportPreferenceContinue ? <NewCase /> : <AnonymousCheck />}</>;
};
export default Dashboard;
