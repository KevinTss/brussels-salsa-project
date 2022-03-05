import { Button } from '../../../ui';
import { CockpitContainer, DayDateContainer, CTAs } from './style';
import { CalendarView } from '../../../../types';
import { djs } from '../../../../utils';

type CalendarCockpitProps = {
  currentDate: any;
  goToNextWeek: () => {};
  goToPreviousWeek: () => {};
  goToThisWeek: () => {};
  isNextDisabled: boolean;
  isPreviousDisabled: boolean;
  monday: any;
  view: CalendarView;
};

export default function CalendarCockpit({
  currentDate,
  goToNextWeek,
  goToPreviousWeek,
  goToThisWeek,
  isNextDisabled,
  isPreviousDisabled,
  monday,
  view,
}: CalendarCockpitProps) {
  return (
    <CockpitContainer>
      <DayDateContainer>
        {view === CalendarView.WEEK
          ? `Week of ${monday.format('dddd DD, MMMM YYYY')}`
          : null}
      </DayDateContainer>
      <CTAs>
        <Button
          appearance='primary'
          onClick={isPreviousDisabled ? () => {} : goToPreviousWeek}
          iconLeft='angle-right'
          isIconReverse
          isDisabled={isPreviousDisabled}
          iconRight={undefined}
          isLoading={undefined}
        >
          Previous
        </Button>
        <Button
          appearance='primary'
          onClick={goToThisWeek}
          isDisabled={
            view === CalendarView.WEEK
              ? currentDate
                  .weekday(0)
                  .hour(0)
                  .minute(0)
                  .format('DD/MM/YYYY') ===
                djs().weekday(0).hour(0).minute(0).format('DD/MM/YYYY')
              : currentDate.isToday()
          }
          iconLeft={undefined}
          iconRight={undefined}
          isLoading={undefined}
          isIconReverse={undefined}
        >
          Today
        </Button>
        <Button
          appearance='primary'
          onClick={isNextDisabled ? () => {} : goToNextWeek}
          iconRight='angle-right'
          isDisabled={isNextDisabled}
          iconLeft={undefined}
          isLoading={undefined}
          isIconReverse={undefined}
        >
          Next
        </Button>
      </CTAs>
      <CTAs $onlyMobile>
        <Button
          appearance='primary'
          onClick={isPreviousDisabled ? () => {} : goToPreviousWeek}
          iconLeft='angle-right'
          isIconReverse
          // eslint-disable-next-line react/no-children-prop
          children={undefined}
          isDisabled={isPreviousDisabled}
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
          Today
        </Button>
        <Button
          appearance='primary'
          onClick={isNextDisabled ? () => {} : goToNextWeek}
          iconRight='angle-right'
          isDisabled={isNextDisabled}
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
