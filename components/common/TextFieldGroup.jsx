import React from 'react'
import classnames from 'classnames'
const { string, func } = React.PropTypes

const TextFieldGroup = ({field, value, label, error, type, onChange, onBlur}) => {
  return (
    <div className={classnames('form-group', {'has-error': error})}>
      <label className='control-label'>{label}</label>
      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        name={field}
        className='form-control'
      />
      {error &&
        <span className='help-block'>
          {error}
        </span>
      }
    </div>
  )
}

TextFieldGroup.propTypes = {
  field: string.isRequired,
  value: string.isRequired,
  label: string.isRequired,
  error: string,
  type: string.isRequired,
  onChange: func.isRequired,
  onBlur: func
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup
