# GPIO testimport RPi.GPIO as GPIO program
import RPi.GPIO as GPIO
from time import sleep

pins = [ # Pins in order of contestant ID
	16,
	18,
	22,
	26
]

GPIO.setmode(GPIO.BCM)
GPIO.setup(pins[0], GPIO.IN, pull_up_down=GPIO.PUD_DOWN) # C1
GPIO.setup(pins[1], GPIO.IN, pull_up_down=GPIO.PUD_DOWN) # C2
GPIO.setup(pins[2], GPIO.IN, pull_up_down=GPIO.PUD_DOWN) # C3
GPIO.setup(pins[3], GPIO.IN, pull_up_down=GPIO.PUD_DOWN) # C4

while True:
	c1 = GPIO.input(pins[0])
	c2 = GPIO.input(pins[1])
	c3 = GPIO.input(pins[2])
	c4 = GPIO.input(pins[3])
	print("c1: " + str(c1))
	print("c2: " + str(c2))
	print("c3: " + str(c3))
	print("c4: " + str(c4))
	sleep(0.1)

