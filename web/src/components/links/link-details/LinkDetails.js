

import moment from 'moment';
import { Component } from "react";
import { Link } from 'react-router-dom';
import linksService from '../../../services/links-service';
import { useHistory } from 'react-router-dom'

class LinkDetails extends Component {
    state = {
    link: null
  }

  componentDidMount() {
    const id = this.props.match?.params?.id;
    linksService.details(id)
      .then(link => this.setState({ link }))
      .catch(error => {
        console.error(error);
        if (error.response?.status === 404) {
          this.props.history.push('/404');
        }
      });
  }

  handleDeleteLink(id) {
    linksService.remove(id)
      .then(() => this.props.history.push("/"))
      .catch(error => console.error(error));
  }

  render() {
    const { link } = this.state;
    return link && (
        <div className="container py-5">
            <div className="row mb-3">
                    <img src={link.image} alt={link.title} className="img-fluid" />
            </div>
            <div className="row">
                <div className="col-12">
                    <h1>{link.title}</h1>
                    <p>{link.description}</p>
                    <p><small>{moment(link.createdAt).fromNow()}</small></p>
                </div>
                <div className="col-12">
                    <div className="btn-group" role="group">
                        <Link to={`/${link.id}/edit`} role="button" className="btn btn-primary" >
                            <i className="fa fa-edit"></i>
                        </Link>
                        <a href={link.url} role="button" className="btn btn-secondary" >
                            <i className="fa fa-eye"></i>
                        </a>
                        <button role="button" onClick={() => this.handleDeleteLink(link.id)} className="btn btn-danger" >
                            <i className="fa fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}
export default LinkDetails;