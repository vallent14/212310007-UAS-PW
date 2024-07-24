<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Models\Ticket;
class LoginController extends Controller
{
    public function Login (){
        return view('auth.login');
    }
    public function postLogin(Request $request){
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $auth=Auth::user();
            if ($auth->role_id==1){
                //mahasiswa
                return redirect()->intended('ticket');
            }
            // teknisi
            $ticket=Ticket::all();
            return view('teknisi.index', compact('ticket'));

        }

        return 'gagal login';
        // return back()->withErrors([
        //     'email' => 'The provided credentials do not match our records.',
        // ])->onlyInput('email');
    }
    }
