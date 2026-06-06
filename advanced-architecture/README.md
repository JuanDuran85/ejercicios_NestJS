
curl -X POST http://localhost:3000/alarms -H "Content-Type: application/json" -d '{"name": "Test Alarm", "severity": "high"}'


curl -X GET http://localhost:3000/alarms



curl --location --request POST 'localhost:3000/alarms' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Alarm 1",
    "severity": "HIGH",
    "triggeredAt": "2021-01-01T00:00:00.000Z",
    "items": [
        {
            "name": "Item 1",
            "type": "TYPE_1"
        },
        {
            "name": "Item 2",
            "type": "TYPE_2"
        }
    ]
}' | json_pp


curl http://localhost:3000/alarms | json_pp

curl -X PATCH http://localhost:3000/alarms/50281871-364d-4312-96c3-92be36322220/acknowledge