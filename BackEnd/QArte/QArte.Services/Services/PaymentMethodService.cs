﻿using System;
using QArte.Services.DTOs;
using QArte.Services.DTOMappers;
using QArte.Services.ServiceInterfaces;
using Microsoft.EntityFrameworkCore;
using QArte.Persistance.Enums;
using QArte.Persistance;
using Microsoft.VisualBasic;
using QArte.Persistance.PersistanceModels;

namespace QArte.Services.Services
{
    public class PaymentMethodService : IPaymentMethodsService
    {
        private readonly QArteDBContext _qArteDBContext;

        public PaymentMethodService(QArteDBContext _qArteDBContext)
        {
            this._qArteDBContext = _qArteDBContext;
        }

        public async Task<IEnumerable<PaymentMethodDTO>> GetAsync()
        {
            return await _qArteDBContext.PaymentMethods
                            .Select(x => new PaymentMethodDTO
                            {
                                ID = x.ID,
                                paymentName = x.PaymentMethods,
                                BankAccounts = x.BankAccounts.Select(y => new BankAccountDTO
                                {
                                    ID = y.ID,
                                    IBAN = y.IBAN,
                                    BeneficiaryName = y.BeneficiaryName,
                                    StripeInfo = y.StripeInfo,
                                    PaymentMethodID = y.PaymentMethodID,
                                }).ToList()
                            }).ToListAsync();
        }

        public async Task<PaymentMethodDTO> GetPaymentMethodByID(int id)
        {
            var result = await _qArteDBContext.PaymentMethods
                            .FirstOrDefaultAsync(x => x.ID == id)
                            ?? throw new ApplicationException("Not found");
            return result.GetDTO();
        }



        public async Task<PaymentMethodDTO> GetPaymentMethodByUserID(int id)
        {
            var result = await _qArteDBContext.PaymentMethods
                            .FirstOrDefaultAsync(x => x.ID == id)
                            ?? throw new ApplicationException("Not found");
            return result.GetDTO();
        }


        public async Task<bool> PaymentMethodExists(int id)
        {
            return await _qArteDBContext.PaymentMethods.AnyAsync(x => x.ID == id);
        }


        public async Task<PaymentMethodDTO> PostAsync(PaymentMethodDTO obj)
        {
            _ = await PaymentMethodExists(obj.ID)
                == true ? throw new ApplicationException("Not found") : 0;

            PaymentMethodDTO result = null;

            var deletedPaymentMethod = await _qArteDBContext.PaymentMethods
                                            .IgnoreQueryFilters()
                                            .FirstOrDefaultAsync(x => x.ID == obj.ID);
            var newPaymentMethod = obj.GetEnity();
            if (deletedPaymentMethod == null)
            {
                await this._qArteDBContext.PaymentMethods.AddAsync(newPaymentMethod);
                await _qArteDBContext.SaveChangesAsync();
                result = deletedPaymentMethod.GetDTO();
            }
            else
            {
                result = deletedPaymentMethod.GetDTO();

            }

            return result;
        }

        public async Task<PaymentMethodDTO> UpdateAsync(int id, PaymentMethodDTO obj)
        {
            _ = await PaymentMethodExists(obj.ID)
                == true ? throw new ApplicationException("Not found") : 0;

            var paymentMethod = await this._qArteDBContext.PaymentMethods
                        .Include(x => x.BankAccounts)
                    .FirstOrDefaultAsync(x => x.ID == id)
                    ?? throw new ApplicationException("Not found");


            paymentMethod.ID = obj.ID;
            paymentMethod.PaymentMethods = obj.paymentName;

            await _qArteDBContext.SaveChangesAsync();
            return paymentMethod.GetDTO();
        }


        public async Task<PaymentMethodDTO> DeleteAsync(int id)
        {
            var paymentMethod = await _qArteDBContext.PaymentMethods
                        .Include(x => x.BankAccounts)
                        .Include(x => x.PaymentMethods)
                        .FirstOrDefaultAsync(x => x.ID == id)
                        ?? throw new ApplicationException("Not found");

            this._qArteDBContext.PaymentMethods.Remove(paymentMethod);
            await _qArteDBContext.SaveChangesAsync();

            return paymentMethod.GetDTO();


        }

    }
}

