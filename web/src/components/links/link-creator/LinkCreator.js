
import { Component } from 'react';
import linksService from '../../../services/links-service';
import './LinkCreator.css';

const URL_PATTERN = /^(ftp|http|https):\/\/[^ "]+$/;

const validations = {
  url: (value) => {
    let message;
    if (!value) {
        message = 'Url is required';
      }
    if (value && !URL_PATTERN.test(value)) {
      message = 'Url is not valid';
    }
    return message;
  }
}


class LinkCreator extends Component {

  state = this.initialState()

  initialState() {
    return {
      link: {
        url: '',
        title: '',
        description: '',
        image: '',
        keywords: []
      },
      errors: {
        url: validations.url('')
      },
      touched: {
        url: false,
      }
    }
  }

  handleInputChange(event) {
    const inputName = event.target.name;
    const value = event.target.value;
    this.setState((prevState) => ({
      link: {
        ...prevState.link,
        [inputName]: value,
      },
      errors: {
        ...prevState.errors,
        [inputName]: validations[inputName] ? validations[inputName](value) : undefined,
      }
    }))
  }

  handleBlur(event) {
    const inputName = event.target.name;
    this.setState(({ touched }) => ({
      touched: {
        ...touched,
        [inputName]: true
      }
    }));
  }

  isFormValid() {
    const { errors } = this.state;
    return !Object.keys(errors).some(key => errors[key] !== undefined);
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.isFormValid()) {
      const { link } = this.state;

      linksService.create(link)
        .then(link => {
          this.props.onCreateLink(link);
          this.setState(this.initialState());
        })
        .catch(error => {
          const { errors, message } = error.response?.data || error;
          console.error(message);
          const touched = Object.keys(errors || {}).reduce((touched, key) => {
            touched[key] = true;
            return touched;
          }, {});

          this.setState({
            errors: {
              url: errors ? undefined : message,
              ...errors,
            },
            touched: {
              url: errors ? false : true,
              ...touched
            }
          })
        })
    }
    
  }

  render() {
    const { link, errors, touched } = this.state;
    return (
      <div className="row my-3 mx-4">
        <div className="col-12">
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="input-group">
                    <input type="text" name="url" className={`form-control ${errors.url && touched.url ? 'is-invalid' : ''}`} placeholder="https://...." aria-label="Add link" value={link.url} onChange={(event) => this.handleInputChange(event)} onBlur={(event) => this.handleBlur(event)} />
                    <button className="btn btn-outline-secondary" type="submit" disabled=""><i className="fa fa-plus"></i></button>
                    {errors.url && touched.url && <div className="invalid-feedback">{errors.url}</div>}
                </div>
            </form>
        </div>
      </div>
    );
  }
}

LinkCreator.defaultProps = {
  onCreateLink: () => {}
}


export default LinkCreator;
