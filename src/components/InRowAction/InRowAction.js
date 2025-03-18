import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

const InRowAction = props => {
  const {
    cell,
    editModal,
    deleteModal,
    viewModal,
    editRedirectUrl,
    viewRedirectUrl,
    viewRedirectUrl2,
    buttonTitle,
    icon,
  } = props

  return (
    <>
      <div className="row-actions d-flex">
        {viewModal ? (
          <button
            onClick={() => viewModal(cell.row.original)}
            className="btn btn-info waves-effect waves-light"
          >
            <i className="fas fa-eye"></i>
          </button>
        ) : null}

        {editModal ? (
          <button
            onClick={() => editModal(cell.row.original)}
            className="btn btn-info waves-effect waves-light"
          >
            {buttonTitle ? buttonTitle : null} <i className="fas fa-edit"></i>
          </button>
        ) : null}

        {deleteModal ? (
          <button
            onClick={() => deleteModal(cell.row.original)}
            className="btn btn-danger waves-effect waves-light"
          >
            <i className="fas fa-trash"></i>
          </button>
        ) : null}

        {editRedirectUrl ? (
          <Link to={`${editRedirectUrl}`} target="_blank">
            <button className="btn btn-info waves-effect waves-light">
              {buttonTitle ? buttonTitle : null} <i className="fas fa-edit"></i>
            </button>
          </Link>
        ) : null}

        {viewRedirectUrl ? (
          <Link to={`${viewRedirectUrl}`} target="_blank">
            <button className="btn btn-info waves-effect waves-light">
              {buttonTitle ? buttonTitle : null} <i className="fas fa-eye"></i>
            </button>
          </Link>
        ) : null}

        {viewRedirectUrl2 ? (
          <Link to={`${viewRedirectUrl2}`} target="_blank">
            <button className="btn btn-info waves-effect waves-light">
              {buttonTitle ? buttonTitle : null}{' '}
              {!isEmpty(icon) ? <i className={icon}></i> : null}
            </button>
          </Link>
        ) : null}
      </div>
    </>
  )
}
InRowAction.defaultProps = {
  icon: '',
}

InRowAction.propTypes = {
  cell: PropTypes.object,
  editModal: PropTypes.func,
  deleteModal: PropTypes.func,
  viewModal: PropTypes.func,
  editRedirectUrl: PropTypes.string,
  viewRedirectUrl: PropTypes.string,
  viewRedirectUrl2: PropTypes.string,
  buttonTitle: PropTypes.string,
  icon: PropTypes.string,
}

export default InRowAction
