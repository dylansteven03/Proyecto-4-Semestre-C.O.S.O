/* Simple seat map generator and interaction helper
   Usage: call window.initReserveModal({rows:6, cols:5, occupied: ['1B','3C']})
   Integrates with elements: #seatMap, #reserveSummary, #confirmBtn, #cancelBtn, #reserveClose
*/
(function(){
  function qs(sel){return document.querySelector(sel);} 
  function qsa(sel){return Array.from(document.querySelectorAll(sel));}

  function createSeatButton(seatId, state){
    const btn = document.createElement('button');
    btn.className = 'seat ' + (state === 'occupied' ? 'occupied' : 'available');
    btn.type = 'button';
    btn.setAttribute('data-seat', seatId);
    btn.setAttribute('aria-label', `Asiento ${seatId} ${state === 'occupied' ? 'ocupado' : 'disponible'}`);
    btn.textContent = seatId;
    if(state === 'occupied') btn.disabled = true;
    btn.addEventListener('click', function(){
      if(btn.disabled) return;
      const already = btn.classList.contains('selected');
      qsa('.seat.selected').forEach(s=>s.classList.remove('selected'));
      if(!already) btn.classList.add('selected');
      // set hidden input used by existing reservation flow
      const seatInput = qs('#seatNumber'); if(seatInput) seatInput.value = seatId;
      // notify existing summary updater if present
      if(typeof window.updateReserveSummary === 'function') window.updateReserveSummary();
    });
    btn.tabIndex = 0;
    return btn;
  }

  function renderSeatMap(rows, cols, occupied){
    const container = qs('#seatMapContainer') || qs('#seatMap');
    container.innerHTML = '';
    for(let r=1;r<=rows;r++){
      for(let c=0;c<cols;c++){
        const seatId = `${r}${String.fromCharCode(65 + c)}`;
        const state = occupied.includes(seatId) ? 'occupied' : 'available';
        const btn = createSeatButton(seatId,state);
        container.appendChild(btn);
      }
    }
  }

  function updateSummary(){
    const sel = qs('.seat.selected');
    const seat = sel ? sel.getAttribute('data-seat') : '-';
    const price = qs('#sumPrice') ? qs('#sumPrice').textContent : '';
    if(qs('#sumPackages')) qs('#sumPackages').textContent = qsa('#packagesList input:checked').map(i=>i.value).join(', ') || '-';
    if(qs('#sumClass')) qs('#sumClass').textContent = qs('#ticketClass') ? qs('#ticketClass').selectedOptions[0].textContent : '';
    if(qs('#sumTotal')){
      // naive total calc: base price from text -> number
      const base = parseInt((price || '0').replace(/[^0-9]/g,'')) || 0;
      // packages sum (not calculated here) - keep base
      qs('#sumTotal').textContent = price;
    }
    if(qs('#sumFlight')) qs('#sumFlight').textContent = 'CS001';
  }

  function initEvents(){
    const close = qs('#reserveClose') || qs('.modal__close');
    const cancel = qs('#cancelBtn') || (qs('#reserveModal') && qs('#reserveModal .btn--outline')) || qs('.btn--outline');
    const confirm = qs('#confirmBtn') || (qs('#reserveModal') && qs('#reserveModal .btn--primary')) || qs('.btn--primary');
    [close,cancel].forEach(b=> b && b.addEventListener('click', ()=>{ toggleModal(false); }));
    if(confirm) confirm.addEventListener('click', ()=>{ 
      // simple confirm action: read selected seat
      const sel = qs('.seat.selected');
      if(!sel){ alert('Por favor selecciona un asiento antes de confirmar.'); return; }
      const seat = sel.getAttribute('data-seat');
      // dispatch custom event with reservation detail
      document.dispatchEvent(new CustomEvent('reserve:confirmed', { detail:{ seat } }));
      toggleModal(false);
    });
    // ticket class change updates summary
    const t = qs('#ticketClass'); if(t) t.addEventListener('change', updateSummary);
    // packages toggle
    document.addEventListener('change', function(e){ if(e.target && e.target.name==='package') updateSummary(); });
  }

  function toggleModal(show){
    const m = qs('#reserveModal');
    if(!m) return;
    // prefer existing app modal helpers to preserve overlay/flex behavior
    if(show){
      if(typeof window.openModal === 'function'){ window.openModal('reserveModal'); return; }
      m.style.display = 'flex';
    } else {
      if(typeof window.closeModal === 'function'){ window.closeModal('reserveModal'); return; }
      m.style.display = 'none';
    }
    if(show){
      // focus first interactive
      setTimeout(()=>{ const f = qs('#ticketClass') || qs('.seat'); if(f) f.focus(); },120);
    }
  }

  window.initReserveModal = function(opts){
    opts = opts || {};
    const rows = opts.rows || 6;
    const cols = opts.cols || 5;
    const occupied = opts.occupied || [];
    renderSeatMap(rows,cols,occupied);
    initEvents();
    updateSummary();
    toggleModal(true);
  };

  // convenience alias similar to existing app function name
})();
