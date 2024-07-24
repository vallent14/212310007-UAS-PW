<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DetailTicketController extends Controller
{

        public function detail_ticket()
        {
            return view('teknisi.detail_ticket');
        }

        public function gotoRiwayatTicket(Request $request)
        {
            return redirect()->route('riwayat.ticket');
        }
    }

