import React from 'react';
import DateView from 'react-datepicker'
import { Field, ErrorMessage } from 'formik';
import "./CustomForm.css";

export function CustomError (props) {
    return <div className='error'>{props.children}</div>
}

export function CustomInput (props) {
  const { label, name, ...rest } = props
  return (
    <div className='form-control'>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} />
      <ErrorMessage component={CustomError} name={name} />
    </div>
  )
}

export function CustomDate (props) {
    const { label, name, ...rest } = props
    return (
      <div className='form-control'>
        <label htmlFor={name}>{label}</label>
        <Field name={name}>
          {({ form, field }) => {
            const { setFieldValue } = form
            const { value } = field
            return (
              <DateView
                id={name}
                {...field}
                {...rest}
                selected={value}
                onChange={val => setFieldValue(name, val)}
              />
            )
          }}
        </Field>
        <ErrorMessage component={CustomError} name={name} />
      </div>
    )
  }

export function CustomText (props) {
    const { label, name, ...rest } = props
    return (
      <div className='form-control'>
        <label htmlFor={name}>{label}</label>
        <Field as='textarea' id={name} name={name} {...rest} />
        <ErrorMessage component={CustomError} name={name} />
      </div>
    )
  }

export function CustomSelect (props) {
    const { label, name, options, ...rest } = props
    return (
      <div className='form-control'>
        <label htmlFor={name}>{label}</label>
        <Field as='select' id={name} name={name} {...rest}>
          {options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.key}
              </option>
            )
          })}
        </Field>
        <ErrorMessage component={CustomError} name={name} />
      </div>
    )
}

export function CustomButtons (props) {
    const { label, name, options, ...rest } = props
    return (
      <div className='form-control'>
        <label>{label}</label>
        <Field name={name} >
          {({ field }) => {
            return options.map(option => {
              return (
                <React.Fragment key={option.key}>
                  <input
                    type='radio'
                    id={option.value}
                    {...field}
                    {...rest}
                    value={option.value}
                    checked={field.value === option.value}
                  />
                  <label htmlFor={option.value}>{option.key}</label>
                </React.Fragment>
              )
            })
          }}
        </Field>
        <ErrorMessage component={CustomError} name={name} />
      </div>
    )
}

export function CustomCheck (props) {
    const { label, name, options, ...rest } = props
    return (
      <div className='form-control'>
        <label>{label}</label>
        <Field name={name}>
          {({ field }) => {
            return options.map(option => {
              return (
                <React.Fragment key={option.key}>
                  <input
                    type='checkbox'
                    id={option.value}
                    {...field}
                    {...rest}
                    value={option.value}
                    checked={field.value.includes(option.value)}
                  />
                  <label htmlFor={option.value}>{option.key}</label>
                </React.Fragment>
              )
            })
          }}
        </Field>
        <ErrorMessage component={CustomError} name={name} />
      </div>
    )
}

function CustomFormType (props) {
    const { control, ...rest } = props
    switch (control) {
      case 'input':
        return <CustomInput {...rest} />
      case 'textarea':
        return <CustomText {...rest} />
      case 'select':
        return <CustomSelect {...rest} />
      case 'radio':
        return <CustomButtons {...rest} />
      case 'checkbox':
        return <CustomCheck {...rest} />
      case 'date':
        return <CustomDate {...rest} />
      default:
        return null
    }
}
export default CustomFormType;

// export {CustomInput, CustomButtons, CustomCheck, CustomDate, CustomSelect, CustomText};
