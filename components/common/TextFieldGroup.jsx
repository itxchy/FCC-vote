const React = require('react')
const classnames = require('classnames')
const { string, func } = React.PropTypes

const TextFieldGroup = ({field, value, label, error, type, onChange}) => {
  return (
    <div className={classnames('form-group', {'has-error': error})}>
      <label className='control-label'>{label}</label>
      <input
        value={value}
        onChange={onChange}
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
  onChange: func.isRequired
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

module.exports = TextFieldGroup
