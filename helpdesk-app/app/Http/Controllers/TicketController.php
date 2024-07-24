<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ticket = Ticket::all();
        return view('mahasiswa.ticket' , compact('ticket'));
    }

    public function riwayat_ticket()
    {
        $ticket = Ticket::all();
        return view('mahasiswa.riwayat' , compact('ticket'));
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    public function delete($item){
        $ticket = Ticket::find($item);
        $ticket->delete($item);
        return redirect()->back()->with('success','Data Berhasil di Hapus');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $insert = $request->all();
        $insert['status'] =0;
        Ticket::create($insert);
        return redirect()->route('ticket.riwayat');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $ticket = Ticket::findOrFail($id);
        return view('teknisi.detail_ticket', compact('ticket'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function edit(Ticket $ticket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ticket $ticket)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ticket $ticket)
    {
        //
    }

    public function updateProsesStatus($id)
    {
        $ticket = Ticket::all();
        $data = Ticket::findOrFail($id);
        $data->update(['status' => 1]);
        return view('teknisi.index', compact('ticket'));
    }

    public function updateProsesSelesai($id)
    {
        $ticket = Ticket::all();
        $data = Ticket::findOrFail($id);
        $data->update(['status' => 2]);
        return view('teknisi.index', compact('ticket'));
    }
}

