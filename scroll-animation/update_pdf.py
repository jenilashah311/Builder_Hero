import re

with open('index.html', 'r') as f:
    content = f.read()

letterhead_new = '''<div id="printable-letterhead-content" class="w-full max-w-[800px] bg-white p-6 sm:p-10 shadow-md text-black font-sans text-xs sm:text-[13px] leading-relaxed">
          
          <!-- Official Letterhead Header (Matched to Sample PDF) -->
          <div class="border-b-4 border-[#3b5b99] pb-4 mb-6">
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-16 h-16 rounded-full border border-[#d4af37] bg-white flex flex-col items-center justify-center p-1 text-center relative">
                  <span class="text-2xl font-black text-[#d4af37] leading-none tracking-tighter">30</span>
                  <span class="text-[7px] font-extrabold text-[#d4af37] uppercase tracking-wider mt-0.5">YEARS</span>
                  <div class="absolute inset-x-0 -bottom-3 text-[5px] font-bold text-[#d4af37] tracking-widest uppercase">EXPERIENCE</div>
                </div>
                <div class="ml-2">
                  <div class="flex items-center gap-2">
                    <span class="text-4xl font-black text-[#d4af37] font-serif tracking-tighter italic">AS</span>
                    <span class="text-2xl font-black text-[#3b5b99] tracking-tight">Ajay Shah &amp; Associates</span>
                  </div>
                  <div class="text-[10px] font-black text-[#d4af37] tracking-widest uppercase ml-[3.5rem] -mt-1">
                    ENGINEERS &amp; CONTRACTORS
                  </div>
                </div>
              </div>

              <div class="text-right text-[#3b5b99]">
                <div class="text-xl font-bold font-sans tracking-wide">Ajay H. Shah</div>
                <div class="text-sm font-semibold text-right">(B.E.Civil)</div>
                <div class="text-sm font-bold mt-1">M.: 98246 66003</div>
              </div>
            </div>
          </div>

          <!-- To & Date -->
          <div class="flex justify-between items-start mb-6">
            <div class="space-y-0.5">
              <div class="text-black">To,</div>
              <div id="letterhead-client" class="text-black">Shri Rajeshbhai Patel,</div>
              <div id="letterhead-company" class="text-black">The Grand Villa Residence,</div>
              <div id="letterhead-location" class="text-black">Manjalpur, Vadodara.</div>
            </div>
            <div class="text-right font-sans text-sm">
              <span>Date: </span><span id="letterhead-date">19 / 09 / 2026</span>
            </div>
          </div>

          <!-- Subject -->
          <div class="mb-4">
            <div id="letterhead-subject" class="font-bold text-black">
              Subject: Quotation of civil work as per drawings provided.
            </div>
          </div>

          <!-- Salutation -->
          <div class="mb-4 text-[13px] leading-relaxed text-black">
            <div>Dear Sir,</div>
            <div class="mt-2" id="letterhead-opening">
              With reference to all the drawings given by you and as per our discussion, we are pleased to submit our quotation for the civil work of the industrial shed at Por.
            </div>
          </div>

          <!-- Table -->
          <div class="mb-0 border border-[#3b5b99]">
            <table class="w-full text-center border-collapse text-[13px]">
              <thead class="bg-[#ddebf7] text-black font-bold border-b border-[#3b5b99]">
                <tr class="divide-x divide-[#3b5b99]">
                  <th class="py-2 px-2 w-12 text-center">SR.<br>NO</th>
                  <th class="py-2 px-3 text-left">ITEM</th>
                  <th class="py-2 px-3 w-16 text-center">QTY</th>
                  <th class="py-2 px-3 w-16 text-center">RATE</th>
                  <th class="py-2 px-3 w-16 text-center">UNIT</th>
                  <th class="py-2 px-3 w-32 text-center">AMOUNT (Rs.)</th>
                </tr>
              </thead>
              <tbody id="letterhead-items-tbody" class="divide-y divide-[#3b5b99]">
                <!-- Dynamically populated -->
              </tbody>
              <tfoot class="font-bold bg-[#ddebf7]">
                <tr class="divide-x divide-[#3b5b99] border-t border-[#3b5b99]">
                  <td colspan="5" class="py-1.5 px-3 text-right uppercase">GST @ 18%:</td>
                  <td id="letterhead-gst-amount" class="py-1.5 px-3 text-right">19,97,136</td>
                </tr>
                <tr class="divide-x divide-[#3b5b99] border-t border-[#3b5b99]">
                  <td colspan="5" class="py-1.5 px-3 text-right uppercase">TOTAL:</td>
                  <td id="letterhead-grand-total" class="py-1.5 px-3 text-right">1,30,92,336</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <!-- Amount in Words -->
          <div class="px-2 py-1.5 border-x border-b border-[#3b5b99] mb-8 text-[13px] text-black bg-[#f2f6fa]">
            <span class="italic">Amount in words: </span><span id="letterhead-words" class="italic">Rupees One Crore Thirty Lakh Ninety-Two Thousand Three Hundred Thirty-Six Only.</span>
          </div>

          <!-- Scope of Rate -->
          <div class="mb-4 space-y-1 text-[13px] text-black">
            <div class="font-bold">Scope of Rate</div>
            <div id="letterhead-scope-list" class="space-y-1 pl-1">
              <!-- Dynamically populated -->
            </div>
          </div>

          <!-- Notes -->
          <div class="mb-12 space-y-1 text-[13px] text-black">
            <div class="font-bold">Payment Terms</div>
            <div id="letterhead-notes-list" class="space-y-1 pl-1">
              <!-- Dynamically populated -->
            </div>
          </div>

          <!-- Signature Block -->
          <div class="flex justify-between items-end pt-12">
            <div>
              <div class="text-[13px] text-black">We hope our quotation suits your requirement and that you will give us the opportunity to work on your prestigious project. We assure you of the best possible quality, workmanship and timely completion of the project.</div>
              <div class="mt-4 text-[13px] text-black">Thank you.</div>
              <div class="mt-4 text-[13px] text-black">Yours sincerely,</div>
              <div class="mt-12 font-bold text-black">Ajay Shah</div>
              <div class="text-black">Ajay Shah &amp; Associates</div>
            </div>
          </div>
          
          <div class="h-12"></div>

          <!-- Footer Bar -->
          <div class="bg-[#3b5b99] text-white text-center py-2.5 text-xs sm:text-sm w-[calc(100%+3rem)] -ml-6 sm:-ml-10 -mb-6 sm:-mb-10 flex items-center justify-center gap-2 mt-auto self-end justify-self-end">
            <span>&bull; 10, Vraj Darshan Society, Manjalpur, Vadodara - 390 011.</span>
            <span>&bull; E-mail: ahshah05@gmail.com</span>
          </div>
          
        </div>'''

start_idx = content.find('<div id="printable-letterhead-content"')
end_idx = content.find('</div>\n      </div>\n\n    </div>\n  </div>\n\n  <!--')

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + letterhead_new + content[end_idx:]

with open('index.html', 'w') as f:
    f.write(content)

with open('portal.js', 'r') as f:
    js = f.read()

# Update table body classes
js = js.replace('<tr class="divide-x divide-slate-600">', '<tr class="divide-x divide-[#3b5b99]">')
js = js.replace('<td class="py-2 px-3 text-right font-mono font-bold">₹ ${formatINR(amt)}</td>', '<td class="py-2 px-3 text-right font-sans">${formatINR(amt)}</td>')
js = js.replace('<td class="py-2 px-3 text-right font-mono">${Number(it.qty).toLocaleString()}</td>', '<td class="py-2 px-3 text-right font-sans">${Number(it.qty).toLocaleString()}</td>')
js = js.replace('<td class="py-2 px-3 text-right font-mono">${Number(it.rate).toLocaleString()}</td>', '<td class="py-2 px-3 text-right font-sans">${Number(it.rate).toLocaleString()}</td>')
js = js.replace('<td class="py-2 px-3 text-center font-mono">${it.unit}</td>', '<td class="py-2 px-3 text-center font-sans">${it.unit}</td>')
js = js.replace('<td class="py-2 px-3 text-center font-mono">${idx + 1}</td>', '<td class="py-2 px-3 text-center font-sans">${idx + 1}</td>')

# Remove Rs formatting in tfoot
js = js.replace("safeSetText('letterhead-subtotal', '₹ ' + formatINR(subtotal));", "safeSetText('letterhead-subtotal', formatINR(subtotal));")
js = js.replace("safeSetText('letterhead-gst-amount', '₹ ' + formatINR(gst));", "safeSetText('letterhead-gst-amount', formatINR(gst));")
js = js.replace("safeSetText('letterhead-grand-total', '₹ ' + formatINR(total));", "safeSetText('letterhead-grand-total', formatINR(total));")

# Update arrows for lists
js = js.replace("notesEl.innerHTML += `<div>${i + 1}. ${n}</div>`", "notesEl.innerHTML += `<div>&#10148; ${n}</div>`")
js = js.replace("scopeEl.innerHTML += `<div>&gt; ${s}</div>`", "scopeEl.innerHTML += `<div>&#10148; ${s}</div>`")

with open('portal.js', 'w') as f:
    f.write(js)
