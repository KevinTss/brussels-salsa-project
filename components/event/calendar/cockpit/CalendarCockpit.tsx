import { Button } from '../../../ui';
import { CockpitContainer, DayDateContainer, CTAs } from './style';
import { View } from '../../../../utils/types';
import { djs } from '../../../../utils';

type CalendarCockpitProps = {
  currentDate: any;
  goToNextWeek: () => {};
  goToPreviousWeek: () => {};
  goToThisWeek: () => {};
  isMondayIn1Week: boolean;
  isMondayInPast: boolean;
  monday: any;
  view: View;
};

export default function CalendarCockpit({
  currentDate,
  goToNextWeek,
  goToPreviousWeek,
  goToThisWeek,
  isMondayIn1Week,
  isMondayInPast,
  monday,
  view,
}: CalendarCockpitProps) {
  return (
    <CockpitContainer>
      <DayDateContainer>
        {view === View.WEEK
          ? `Week of ${monday.format('dddd DD, MMMM YYYY')}`
          : monday.format('dddd DD, MMMM YYYY')}
      </DayDateContainer>
      <CTAs>
        <Button
          appearance='primary'
          onClick={goToPreviousWeek}
          iconLeft='angle-right'
          isIconReverse
          isDisabled={isMondayInPast}
          iconRight={undefined}
          isLoading={undefined}
        >
          Previous week
        </Button>
        <Button
          appearance='primary'
          onClick={goToThisWeek}
          isDisabled={
            currentDate.weekday(0).hour(0).minute(0).format('DD/MM/YYYY') ===
            djs().weekday(0).hour(0).minute(0).format('DD/MM/YYYY')
          }
          iconLeft={undefined}
          iconRight={undefined}
          isLoading={undefined}
          isIconReverse={undefined}
        >
          This week
        </Button>
        <Button
          appearance='primary'
          onClick={goToNextWeek}
          iconRight='angle-right'
          isDisabled={isMondayIn1Week}
          iconLeft={undefined}
          isLoading={undefined}
          isIconReverse={undefined}
        >
          Next week
        </Button>
      </CTAs>
      <CTAs $onlyMobile>
        <Button
          appearance='primary'
          onClick={goToPreviousWeek}
          iconLeft='angle-right'
          isIconReverse
          // eslint-disable-next-line react/no-children-prop
          children={undefined}
          isDisabled={isMondayInPast}
          iconRight={undefined}
          isLoading={undefined}
        />
        <Button
          appearance='primary'
          onClick={goToThisWeek}
          isDisabled={
            currentDate.weekday(0).hour(0).minute(0).format('DD/MM/YYYY') ===
            djs().weekday(0).hour(0).minute(0).format('DD/MM/YYYY')
          }
          iconLeft={undefined}
          iconRight={undefined}
          isLoading={undefined}
          isIconReverse={undefined}
        >
          This week
        </Button>
        <Button
          appearance='primary'
          onClick={goToNextWeek}
          iconRight='angle-right'
          isDisabled={isMondayIn1Week}
          // eslint-disable-next-line react/no-children-prop
          children={undefined}
          iconLeft={undefined}
          isLoading={undefined}
          isIconReverse={undefined}
        />
      </CTAs>
    </CockpitContainer>
  );
}
