import React from 'react'
import PlaceOrder from './components/PlaceOrder'
import CancelOrder from './components/CancelOrder'
import UseCartOrderHistory from '../../hooks/order-listing-page-hook/cart-order-history-hook'

const MyOrderMaster = () => {

    const {orderHistoryItems} = UseCartOrderHistory();
    return (
        <>
            <div className="container mt-3">
                <div className="mt-4 row">
                    <div className="col-md-6">
                        <div className="page_heading">
                            <h4
                                className=" bold text-uppercase mb-3 order-heading"
                            >
                                Your Orders
                            </h4>
                        </div>
                    </div>
                </div>
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <a
                            className="nav-link active"
                            data-bs-toggle="tab"
                            href="#placed_order"
                        >
                            Orders
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#can_order">
                            Cancelled
                        </a>
                    </li>
                </ul>

                <div className="tab-content ">
                    <div id="placed_order" className="container tab-pane active show">
                        <br />
                        <PlaceOrder orderHistoryItems={orderHistoryItems} />
                    </div>
                    <div id="can_order" className="container tab-pane fade">
                        <br />
                        <CancelOrder orderHistoryItems={orderHistoryItems} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyOrderMaster