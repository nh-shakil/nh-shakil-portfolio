<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;

class ContactMessageController extends Controller
{
    public function index()
    {
        $messages = ContactMessage::query()
            ->orderByDesc('created_at')
            ->paginate(20);

        return view('admin.contact.index', compact('messages'));
    }

    public function show(ContactMessage $contact_message)
    {
        if (! $contact_message->read_at) {
            $contact_message->update(['read_at' => now()]);
        }

        return view('admin.contact.show', ['message' => $contact_message]);
    }

    public function destroy(ContactMessage $contact_message)
    {
        $contact_message->delete();

        return redirect()->route('admin.contact-messages.index')->with('status', 'Message deleted.');
    }
}
