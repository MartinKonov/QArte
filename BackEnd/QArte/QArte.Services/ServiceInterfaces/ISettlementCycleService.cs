﻿using System;
using QArte.Services.DTOs;
using System.Threading.Tasks;
using System.Collections.Generic;
using QArte.Persistance.Enums;

namespace QArte.Services.ServiceInterfaces
{
    public interface ISettlementCycleService : ICRUDshared<SettlementCycleDTO>
    {
        Task<SettlementCycleDTO> GetSettlementCycleByID(int id);
        Task<IEnumerable<SettlementCycleDTO>> GetSettlementCyclesBeforeDate(DateTime date);
        Task<IEnumerable<SettlementCycleDTO>> GetSettlementCycleByDate(DateTime date);
    }
}

