let type='Ofrenda';
const buttons=[...document.querySelectorAll('[data-type]')];
const otherField=document.getElementById('otherField');
const otherReason=document.getElementById('otherReason');
const form=document.getElementById('form');
buttons.forEach(b=>b.addEventListener('click',()=>{
 type=b.dataset.type;
 buttons.forEach(x=>x.classList.toggle('active',x===b));
 otherField.classList.toggle('hide',type!=='Otros');
 otherReason.required=type==='Otros';
}));
form.addEventListener('submit',e=>{
 e.preventDefault();
 const name=document.getElementById('name').value.trim();
 const ministry=document.getElementById('ministry').value.trim();
 const amount=document.getElementById('amount').value;
 const reason=otherReason.value.trim();
 if(type==='Otros'&&!reason){otherReason.focus();return;}
 const lines=['Hola, envío los datos de mi ofrenda por Yape.','Nombre: '+name,'Ministerio: '+ministry,'Tipo: '+type];
 if(type==='Otros') lines.push('Motivo: '+reason);
 lines.push('Importe: S/ '+amount);
 window.open('https://wa.me/51936086264?text='+encodeURIComponent(lines.join('\n')),'_blank','noopener');
});
// Copiar el número de Yape.
document.getElementById('copyPhone').addEventListener('click', async function(){
  const phone = '936086264';
  const button = this;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(phone);
    } else {
      const temp = document.createElement('textarea');
      temp.value = phone;
      temp.style.position = 'fixed';
      temp.style.opacity = '0';
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      temp.remove();
    }
    button.textContent = '¡Copiado!';
    setTimeout(() => button.textContent = 'Copiar', 1800);
  } catch (err) {
    button.textContent = 'No se pudo copiar';
    setTimeout(() => button.textContent = 'Copiar', 1800);
  }
});
// Abrir Yape: intentar el esquema de la app en móvil; si no se abre,
// dirigir a la ficha oficial de Yape en la tienda correspondiente.
document.getElementById('openYape').addEventListener('click', function(e){
  e.preventDefault();
  const ua = navigator.userAgent || '';
  const android = /Android/i.test(ua);
  const ios = /iPhone|iPad|iPod/i.test(ua);
  if (android) {
    window.location.href = 'intent://#Intent;scheme=yape;package=com.bcp.innovacxion.yapeapp;S.browser_fallback_url=' + encodeURIComponent('https://play.google.com/store/apps/details?id=com.bcp.innovacxion.yapeapp&pcampaignid=web_share') + ';end';
  } else if (ios) {
    window.location.href = 'yape://';
    setTimeout(function(){ window.location.href = 'https://apps.apple.com/pe/app/yape/id1147249919'; }, 1200);
  } else {
    window.open('https://www.yape.com.pe/preguntas-frecuentes/enviar-y-recibir-yapeos/31--como-hago-un-pago-con-qr','_blank','noopener');
  }
});
