import PropTypes from 'prop-types'
import errorImage from '../assets/sad-face.svg'

function Error({ error }) {
    return (
        <div className='center-on-screen'>
            <div className="error-wrapper__content">
                <img src={errorImage} alt="error-image" className='error-img' />
                <p className='error-custom-message'>
                    {error.message === "Request failed with status code 404" ? "Page not found" : `${error.message}`}
                </p>
            </div>
        </div>
    )
}

export default Error

Error.propTypes = {
    error: PropTypes.any
}