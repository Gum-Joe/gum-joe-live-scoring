; AHK script to handle switching
#SingleInstance, force

F21::
    WinGetClass, OldWinClass, A
    WinActivate, ahk_class Qt5QWindowIcon ; Activate OBS
    Send, {F7}
    WinActivate, ahk_class %OldWinClass%
Return

F22::
    WinGetClass, OldWinClass, A
    WinActivate, ahk_class Qt5QWindowIcon ; Activate OBS
    Send, {F8}
    WinActivate, ahk_class %OldWinClass%
Return

F23::
    WinGetClass, OldWinClass, A
    WinActivate, ahk_class Qt5QWindowIcon ; Activate OBS
    Send, {F9}
    WinActivate, ahk_class %OldWinClass%
Return

F24::
    WinGetClass, OldWinClass, A
    WinActivate, ahk_class Qt5QWindowIcon ; Activate OBS
    Send, {F10}
    WinActivate, ahk_class %OldWinClass%
Return