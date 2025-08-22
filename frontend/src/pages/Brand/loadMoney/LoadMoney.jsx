import React, { useState, useEffect } from 'react';
import { creditMoney } from '../../../service/TransactionService';
import { getCurrentUserDetails } from '../../../auth/Index';
import { toast } from 'react-toastify';
import BrandBalanceDashboard from '../../../component/Brand/BrandBalanceDashboard';
import Cashback from '../../User/Cashback';

const LoadMoney = () => {
    

    return (
        <div className="container py-2 mb-4">
            <h2 className='text-white rounded bg-primary p-2'>Balance Summary</h2>
            <BrandBalanceDashboard/>
          <div className="bg-primary mt-3 rounded" >
             <Cashback/>
          </div>
        </div>
    );
};

export default LoadMoney;