/** @format */
import React, { Component } from "react";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Label,
  Col,
  Row,
  ModalHeader,
  Modal,
  ModalBody,
} from "reactstrap";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(+val);
const validEmail = (val) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

export class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleSubmit(values) {
    console.log("Current state is: " + JSON.stringify(values));
    alert("Current state is: " + JSON.stringify(values));
  }
  render() {
    return (
      <div>
        <Button onClick={this.toggleModal} outline className="fa-lg">
          <i className="fa fa-edit " />
          Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group p-3">
                <Label htmlFor="rating">Rating</Label>

                <Control.select
                  model=".rating"
                  id="rating"
                  name="rating"
                  placeholder="Rating"
                  className="form-control "
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Control.select>
              </Row>
              <Row className="form-group p-3">
                <Label htmlFor="author">Your Name</Label>

                <Control.text
                  model=".author"
                  id="author"
                  name="author"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  component="div"
                  messages={{
                    minLength: "Must be at least 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </Row>
              <Row className="form-group p-3">
                <Label htmlFor="comment">Comment</Label>

                <Control.textarea
                  model=".comment"
                  id="comment"
                  name="comment"
                  className="form-control"
                />
              </Row>
              <Row className="form-group p-3">
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

class CampsiteInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      btntxt: "Turn Off Comment",
      btnClass: "btn btn-danger",
    };
  }
  toggler(clicked) {
    if (clicked) {
      console.log(clicked);
      this.setState({ btntxt: "Turn Off Comment" });
      this.setState({ btnClass: "btn btn-danger" });
      this.setState({ clicked: !clicked });
    } else {
      console.log(clicked);
      this.setState({ btntxt: "Turn On Comment" });
      this.setState({ btnClass: "btn btn-success" });
      this.setState({ clicked: !clicked });
    }
  }
  renderCampsite(campsite) {
    return (
      <div className="col-md-5 m-1">
        <Card>
          <CardImg top src={campsite.image} alt={campsite.name} />
          <CardBody>
            <CardTitle>{campsite.name}</CardTitle>
            <CardText>{campsite.description}</CardText>
          </CardBody>
          <button
            onClick={() => this.toggler(this.state.clicked)}
            type="button"
            class={this.state.btnClass}
          >
            {this.state.btntxt}
          </button>
        </Card>
      </div>
    );
  }
  renderComments(comments) {
    if (comments && !this.state.clicked) {
      return (
        <div className="col-md-5 m-1">
          <h4>Comments</h4>
          {comments.map((comment) => {
            return (
              <div key={comment.id}>
                <p>{comment.text}</p>
                <p>
                  --{comment.author}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(comment.date)))}{" "}
                </p>
              </div>
            );
          })}
          <CommentForm />
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    if (this.props.campsite != null) {
      return (
        <div className="container">
          <div className="row">
            <div className="col">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/directory">Directory</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  {this.props.campsite.name}
                </BreadcrumbItem>
              </Breadcrumb>
              <h2>Directory</h2>
              <hr />
            </div>
          </div>
          <div className="row">
            {this.renderCampsite(this.props.campsite)}
            {this.renderComments(this.props.comments)}
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default CampsiteInfo;
