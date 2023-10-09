import React, { useState, useEffect } from 'react';
import UseDealerLedgerHook from '../../hooks/DealerLedgerHooks/dealer-ledger-hook';
import DealerAccounting from './DealerAccounting';
import { useDispatch, useSelector } from 'react-redux';
import {
  dealerLedgerStore,
  fetchDealerLedger,
} from '../../store/slices/dealer-ledger-slice/dealer-ledger-slice';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import DealerLedgerTable from './DealerLedgerTable';
import {
  failmsg,
  hideToast,
} from '../../store/slices/general_slices/toast_notification_slice';
import { SelectedFilterLangDataFromStore } from '../../store/slices/general_slices/selected-multilanguage-slice';
import { showToast } from '../ToastNotificationNew';

const DealerLedger = () => {
  const dispatch = useDispatch();
  const { dealerLedgerSummary }: any = UseDealerLedgerHook();

  const dealerledgerData = useSelector(dealerLedgerStore);

  const TokenFromStore: any = useSelector(get_access_token);
  const SelectedLangDataFromStore: any = useSelector(
    SelectedFilterLangDataFromStore
  );
  const [selectedMultiLangData, setSelectedMultiLangData] = useState<any>();
  useEffect(() => {
    if (
      Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0
    ) {
      setSelectedMultiLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore]);

  console.log('DealerLedgerSummary in tsx', dealerLedgerSummary);
  console.log('DealerLedgerData in tsx', dealerledgerData);

  let customFromDate: any;
  let customToDate: any;

  const [fieldDisable, setFieldDisable] = useState<boolean>(false);
  const [dlSelectedmonth, setDlSelectedMonth] = useState<any>('');
  const [dlFromDate, setDlFromDate] = useState<any>('');
  const [dlToDate, setDlToDate] = useState<any>('');
  const [showDlData, setDlData] = useState<boolean>(false);

  console.log('showDlData', showDlData);
  const [year, month, day] = dlFromDate.split('-');
  customFromDate = [day, month, year].join('-');
  const [toYear, toMonth, toDay] = dlToDate.split('-');
  customToDate = [toDay, toMonth, toYear].join('-');

  const HandleLedgerData = async () => {
    console.log('onsubmit data', dlSelectedmonth, dlFromDate, dlToDate);
    const getDealerLedgerParams = {
      partyName: dealerLedgerSummary?.party_name,
      month: dlSelectedmonth,
      fromDate: customFromDate,
      toDate: customToDate,
      token: TokenFromStore?.token,
    };

    try {
      const DealerLedgerData = await dispatch(
        fetchDealerLedger(getDealerLedgerParams)
      );

      if (DealerLedgerData?.payload?.data?.message?.msg === 'success') {
        setDlData(true);
        setDlSelectedMonth('');
        setDlFromDate('');
        setDlToDate('');
      } else {
        showToast('Please select a month or date range', 'warning');
      }
    } catch (error) {
      console.log('Error occurred:', error);
    }
  };

  return (
    <>
      <div className="container mt-0 mb-0 delaer-leader-container margin_from_nav">
        <div className="row justify-content-center">
          <div className="page_heading ledger-heading">
            <h4 className="my-0">Dealer Ledger</h4>
          </div>
          <div className="container  ">
            <div className="row ledger-padding">
              <DealerAccounting
                dealerLedgerSummary={dealerLedgerSummary}
                selectedMultiLangData={selectedMultiLangData}
              />
              <div className="col-lg-7 card border-dark color-black rounded-0">
                <div className="row m-lg-3">
                  <div className="col-lg-4 col-6 mt-0 pt-0 mb-0 pb-0">
                    <div className="fs-3 color-black ">
                      {selectedMultiLangData?.account_name}: <span className="fs-3 bold color-black">{dealerLedgerSummary?.party_name}</span>
                    </div>
                  </div>
                
                </div>
                <div className="row mx-lg-3 my-2 color-black">
                  <div className="col-lg-4 col-4 mb-0 pb-0 mt-0 pt-0 d-inline-flex justify-content-start">                                      
                    <div className="form-check">
                      <input
                           type="radio"
                           className="form-check-input color-black"
                           id="radio1"
                           name="optradio"
                           value="option1"
                           onClick={() => setFieldDisable(false)}
                           defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="radio1"
                      >
                        {selectedMultiLangData?.month}
                      </label>
                    </div>
                    <select
                      className={`${
                        fieldDisable ? '' : 'disabled'
                      } form-select fs-5 color-black ml-4`}
                      disabled={fieldDisable}
                      onChange={(e) => setDlSelectedMonth(e.target.value)}
                    >
                      <option>{selectedMultiLangData?.select_month}</option>
                      {dealerLedgerSummary?.months?.map(
                        (month: string, index: number) => (
                          <>
                            <option key={index} value={month}>
                              {month}
                            </option>
                          </>
                        )
                      )}
                    </select>
                  </div>
                  <div className="col-lg-8 col-8 mb-0 pb-0 mt-0 pt-0 d-inline-flex justify-content-start">
                    <div className="form-check">
                      <input
                       type="radio"
                       className="form-check-input color-black"
                       id="radio2"
                       name="optradio"
                       value="option1"
                       onClick={() => setFieldDisable(true)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="radio1"
                      >
                        {selectedMultiLangData?.date_range}
                      </label>
                    </div>
                    <div className="row justify-content-center" >
                      <div className="col-lg-6 col-6">
                        <input
                          type="date"
                          id="FromDate"
                          value={dlFromDate}
                          name="FromDate"
                          onChange={(e) => setDlFromDate(e.target.value)}
                          className={`${
                            fieldDisable ? '' : 'disabled'
                          }  px-1 color-black `}
                          disabled={!fieldDisable}
                        />
                      </div>
                      <div className="col-lg-4 col-5">
                        <input
                          type="date"
                          id="toDate"
                          value={dlToDate}
                          name="ToDate"
                          onChange={(e) => setDlToDate(e.target.value)}
                          className={`${
                            fieldDisable ? '' : 'disabled'
                          } px-1 color-black dealer-todate-mob`}
                          disabled={!fieldDisable}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mx-lg-3">
                  <div className="col-lg-5 text-left mb-0">
                    <button
                      className="btn btn-outline-primary ledger-submit-button rounded-3 mt-3 w-50 color-black"
                      onClick={HandleLedgerData}
                    >
                      {selectedMultiLangData?.submit}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showDlData === true && (
            <DealerLedgerTable
              dealerLedgerSummary={dealerLedgerSummary}
              selectedMultiLangData={selectedMultiLangData}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DealerLedger;
