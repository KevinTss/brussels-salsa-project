import { Fragment } from 'react'

import { StepContainer, Step, Separator, Number, Text } from './style'

const StepEl = ({ currentStep, steps, texts }) => (
  <StepContainer>
    {[...Array(steps).keys()].map(step => {
      const realStep = step + 1
      const hasSeparator = realStep < steps

      return (
        <Fragment key={step}>
          <Step isActive={currentStep === realStep}>
            <Number isActive={currentStep >= realStep}>{realStep}</Number>
            <Text>{texts[step]}</Text>
          </Step>
          {hasSeparator && <Separator isActive={currentStep > realStep} />}
        </Fragment>
      )
    })}
  </StepContainer>
)

StepEl.defaultProps = {
  currentStep: 1,
  steps: 3,
  texts: [],
}

export default StepEl
