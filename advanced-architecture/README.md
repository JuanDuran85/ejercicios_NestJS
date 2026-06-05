
curl -X POST http://localhost:3000/alarms -H "Content-Type: application/json" -d '{"name": "Test Alarm", "severity": "high"}'


curl -X GET http://localhost:3000/alarms