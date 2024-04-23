import React, { useState } from 'react';
import './send-assets-dialog.css';
import Avatar from '../../assets/images/avatar.png'

interface ModalProps {
    open: boolean;
    closeModal: () => void;
    message: string;
    sendBalance: (address: string, amount: number) => void;
}

const SendAssetDialog: React.FC<ModalProps> = ({ open, closeModal, sendBalance }) => {
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        sendBalance(address, amount);
    };

    const modalClose = () => {
        setCurrentPage(1)
        closeModal()
    }

    if (!open) {
        return null;
    }

    return (
        <div className="modal-overlay">
            {currentPage == 1 ?
                <div className="modal-content first">
                    <div className="modal-header">
                        <h2>Send BTC</h2>
                        <button onClick={modalClose}>X</button>
                    </div>
                    <form onSubmit={handleSubmit} className="modal-body">
                        <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder='Address or name' required />
                        <label>Transfer Amount</label>
                        <input type="text" value={amount} onChange={e => setAmount(Number(e.target.value))} placeholder='Amount' required />
                    </form>
                    <div>
                        <div className='category'>
                            <span className='status available'>Available</span>
                            <span className='balance available'>0 BTC</span>
                        </div>
                        <div className='category'>
                            <span className='status'>Unavailable</span>
                            <span className='balance'>0.00000000 BTC</span>
                        </div>
                        <div className='category'>
                            <span className='status'>Total</span>
                            <span className='balance'>0.00000000 BTC</span>
                        </div>
                    </div>
                    <form className='modal-body'>
                        <label>Fee</label>
                        <input type="text" value='Satoshi' />
                    </form>
                    <div>
                        <div className='send-button' onClick={() => setCurrentPage(2)}>Send Asset</div>
                    </div>
                </div>
                :
                <div className='modal-content second'>
                    <div className="modal-header">
                        <h2>Send BTC</h2>
                        <button onClick={modalClose}>X</button>
                    </div>
                    <div className='title'>Please confirm the transaction below:</div>
                    <div className='line'>
                        <img src={Avatar} alt='avatar' />
                    </div>
                    <div className='cautious'>This collection was submitted by the community and its validity hasn't been confirmed by UniSat. Please verify(MagicEden, OrdinalsWallet) before making a purchase to avoid any losses.</div>
                    <div className='category'>
                        <span className='status'>Total Value:</span>
                        <span className='balance'>36000</span>
                        <span>sats</span>
                        <span>$23.76</span>
                    </div>
                    <hr />
                    <div className='category'>
                        <span className='status'>Service Fee 0.5%</span>
                        <span className='balance'>100</span>
                        <span>sats</span>
                        <span>$0.12</span>
                    </div>
                    <div className='category'>
                        <span className='status'>Service Fee Final 0.0%:</span>
                        <span className='balance'>0</span>
                        <span>sats</span>
                        <span>$0.00</span>
                    </div>
                    <hr />
                    <div className='category'>
                        <span className='status'>Transaction Fee Rate:</span>
                        <span className='balance'>115</span>
                        <span>sats/vB</span>
                        <span>Customize</span>
                    </div>
                    <div className='category'>
                        <span className='status'>532 vB * 115 sats/vB:</span>
                        <span className='balance'>36000 sats $23.76</span>
                    </div>
                    <hr />
                    <div className='button-line'>
                        <span className='cancel-button' onClick={() => modalClose()}>Cancel</span>
                        <span className='confirm-button' onClick={() => sendBalance(address, amount)}>Confirm</span>
                    </div>
                </div>
            }
        </div>
    );
};

export default SendAssetDialog;