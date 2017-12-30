; AHK script to handle switching
#SingleInstance, force

F21::
    OldWinClass = Qt5QWindowIcon
    #IfWinNotActive, ahk_class Qt5QWindowIcon
    WinGetClass, OldWinClass, A
    WinActivate, ahk_class Qt5QWindowIcon ; Activate OBS
    #IfWinActive
    Send, {F7}
    WinActivate, ahk_class %OldWinClass%
Return

F22::
    OldWinClass = Qt5QWindowIcon
    #IfWinNotActive, ahk_class Qt5QWindowIcon
    WinGetClass, OldWinClass, A
    WinActivate, ahk_class Qt5QWindowIcon ; Activate OBS
    #IfWinActive
    Send, {F8}
    WinActivate, ahk_class %OldWinClass%
Return

F23::
    OldWinClass = Qt5QWindowIcon
    #IfWinNotActive, ahk_class Qt5QWindowIcon
    WinGetClass, OldWinClass, A
    WinActivate, ahk_class Qt5QWindowIcon ; Activate OBS
    #IfWinActive
    Send, {F9}
    WinActivate, ahk_class %OldWinClass%
Return

F24::
    OldWinClass = Qt5QWindowIcon
    #IfWinNotActive, ahk_class Qt5QWindowIcon
    WinGetClass, OldWinClass, A
    WinActivate, ahk_class Qt5QWindowIcon ; Activate OBS
    #IfWinActive
    Send, {F10}
    WinActivate, ahk_class %OldWinClass%
Return