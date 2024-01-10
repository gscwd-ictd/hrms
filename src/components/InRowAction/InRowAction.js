import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const InRowAction = props => {
  const {
    cell,
    editModal,
    deleteModal,
    viewModal,
    editRedirectUrl,
    viewRedirectUrl,
    buttonTitle,
  } = props

  return (
    <>
      <div className="row-actions d-flex">
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

        {viewModal ? (
          <button
            onClick={() => viewModal(cell.row.original)}
            className="btn btn-info waves-effect waves-light"
          >
            <i className="fas fa-eye"></i>
          </button>
        ) : null}

        {editRedirectUrl ? (
          <Link to={`${editRedirectUrl}`}>
            <button className="btn btn-info waves-effect waves-light">
              {buttonTitle ? buttonTitle : null} <i className="fas fa-edit"></i>
            </button>
          </Link>
        ) : null}

        {viewRedirectUrl ? (
          <Link to={`${viewRedirectUrl}`}>
            <button className="btn btn-info waves-effect waves-light">
              {buttonTitle ? buttonTitle : null} <i className="fas fa-eye"></i>
            </button>
          </Link>
        ) : null}
      </div>
    </>
  )
}

InRowAction.propTypes = {
  cell: PropTypes.object,
  editModal: PropTypes.func,
  deleteModal: PropTypes.func,
  viewModal: PropTypes.func,
  editRedirectUrl: PropTypes.string,
  viewRedirectUrl: PropTypes.string,
  buttonTitle: PropTypes.string,
}

export default InRowAction
