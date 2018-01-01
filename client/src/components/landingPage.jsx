import React, { Component } from 'react';

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { champions } = this.props;

    return (
      <div>
        <div className="row justify-content-md-center align-items-center" style={{ height: "100vh" }}>
          <div className="col-8" style={{ textAlign: "center" }}>
            <h1>Welcome to Rune IT</h1>
            <div className="row">
              <form>
                <div className="form-group">
                  <label htmlFor="champSelect">Select a Champion</label>
                  <select className="form-control" id="champSelect">
                    {
                      champions.map(champ => (
                        <option>${champ.name}</option>
                      ))
                    }
                  </select>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default Landing;
