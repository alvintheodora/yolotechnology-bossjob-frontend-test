import React from "react";
import './Pagination.css';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
    this.state = {
      visiblePages: this.getVisiblePages(null, props.pages),
      inputPage: props.page
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.page!==prevProps.page){
      this.setState({inputPage: this.props.page})
    }
    if (this.props.pages !== prevProps.pages) {
      this.setState({
        visiblePages: this.getVisiblePages(null, this.props.pages)
      });
    }
  }

  filterPages = (visiblePages, totalPages) => {
    return visiblePages.filter(page => page <= totalPages);
  };

  getVisiblePages = (page, total) => {
    if (total < 7) {
      return this.filterPages([1, 2, 3, 4, 5, 6], total);
    } else {
      if (page % 5 >= 0 && page > 4 && page + 2 < total) {
        return [1, page - 1, page, page + 1, total];
      } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
        return [1, total - 3, total - 2, total - 1, total];
      } else {
        return [1, 2, 3, 4, 5, total];
      }
    }
  };

  changePage(page) {
    const activePage = this.props.page;
    if (page === activePage) {
      return;
    }
    const visiblePages = this.getVisiblePages(page, this.props.pages);
    this.setState({
      visiblePages: this.filterPages(visiblePages, this.props.pages)
    });    
    this.props.onPageChange(page);    
  }

  handleChangeInputPage = (e) => {
    let inputPage = parseInt(e.target.value, 10);
    if(inputPage > this.props.pages){
      inputPage = this.props.pages
    }else if(inputPage < 1){
      inputPage = 1;
    }
    this.setState({inputPage})
  }

  render() {
    const { visiblePages } = this.state;
    const activePage = this.props.page;
   
    return (
      <div className="pagination">       

        <button
          className={activePage === 1?"pageButtonDisabled":"pageButton"}
          onClick={() => {
            if (activePage === 1) return;
            this.changePage(activePage - 1);
          }}
          disabled={activePage === 1}    
        >
        {"<"}
        </button>        

        {
          visiblePages.map((page, index, array) => {
            return (
              <span
                key={page}
                className={
                    activePage === page
                    ? "pageButton pageButtonActive"
                    : "pageButton"
                }
                onClick={this.changePage.bind(null, page)}
              >
                {array[index - 1] + 2 < page ? `...${page}` : page}
              </span>              
            );
          })
        }        
        
        <button
          className={activePage === this.props.pages?"pageButtonDisabled":"pageButton"}
          onClick={() => {
              if (activePage === this.props.pages) return;
              this.changePage(activePage + 1);
              }}
          disabled={activePage === this.props.pages}
        >
          {">"}
        </button>
          
      </div>
    );
  }
}

export default Pagination