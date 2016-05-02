import React from 'react';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var isInProgress = 0;
    if(this.props.isInProgress)
    {
      isInProgress = this.props.isInProgress;
    }
    return (
        <div className='container-fluid progress-bar-container'>
          <div className='progrss'>
            <div classname='progress-bar progrss-bar-striped active' role='progrssbar' aria-valuenow={isInProgress} aria-valuemin='0' aria-valuenow='100' style={{width: + indicator + '%'}}>
              <span className='sr-only'>{isInProgress}% complete</span>
            </div>
          </div>
           <p className='text-center'>Loading ...</p>
        </div>
    );
  }
}

export default ProgressBar;