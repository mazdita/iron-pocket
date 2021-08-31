
import { Component } from 'react';
import linksService from '../../../services/links-service';
import './LinkEditor.css';
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

class LinkEditor extends Component {

    render() {
        return (
        <div className="row my-3 mx-4">
            <div className="col-12">
                <form onSubmit="">
                    <div className="input-group">
                        <input type="text" name="url" className="form-control" placeholder="https://...." aria-label="Add link" value="" onChange="" onBlur="" />
                        <button className="btn btn-outline-secondary" type="submit" disabled=""><i className="fa fa-plus"></i></button>
                    </div>
                </form>
            </div>
        </div>
        );
    }
}

export default LinkEditor;