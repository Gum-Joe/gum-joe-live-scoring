# Program to control buzzers
import RPi.GPIO as GPIO
import requests # pip install requests
from time import sleep

pins = [ # Pins in order of contestant ID
	16,
	18,
	22,
	26
]
ADDRESS = "https://9e7f2197.ngrok.io" # Address to send who buzzed to
ROUTE = "/api/get/buzz" # Route on the server
SENDTO = ADDRESS + ROUTE
SLEEPTIME = 2 # secs

GPIO.setmode(GPIO.BCM)
GPIO.setup(pins[0], GPIO.IN, pull_up_down=GPIO.PUD_DOWN) # C1
GPIO.setup(pins[1], GPIO.IN, pull_up_down=GPIO.PUD_DOWN) # C2
GPIO.setup(pins[2], GPIO.IN, pull_up_down=GPIO.PUD_DOWN) # C3
GPIO.setup(pins[3], GPIO.IN, pull_up_down=GPIO.PUD_DOWN) # C4

# Program to send whio
def send(id):
	print("[DEBUG] Sending buzz request for contestant with ID " + str(id))
	r = requests.get(SENDTO + "/" + str(id))
	print("[DEBUG] " + str(r.status_code) + str(r.reason))
	
while True:
	c1 = GPIO.input(pins[0])
	c2 = GPIO.input(pins[1])
	c3 = GPIO.input(pins[2])
	c4 = GPIO.input(pins[3])
	if c1:
		# C1 was pressed
		send(0)
		sleep(SLEEPTIME)
	elif c2:
		# C1 was pressed
		send(1)
		sleep(SLEEPTIME)
	elif c3:
		# C1 was pressed
		send(2)
		sleep(SLEEPTIME)
	elif c4:
		# C1 was pressed
		send(3)
		sleep(SLEEPTIME)
	# Print statuses
	#print("[DEBUG] c1: " + str(c1))
	#print("[DEBUG] c2: " + str(c2))
	#print("[DEBUG] c3: " + str(c3))
	#print("[DEBUG] c4: " + str(c4))
