import Bree from 'bree'
import verifyAuth from '../middlewares/verifyAuth'
import Calendar from './Calendar'
let jobs = []
let bree

async function init() {
  await getJobs()

  await startBree()
}

async function startBree() {
  console.log('startBree', jobs)
  bree = new Bree({
    jobs,
  })

  // top-level await supported in Node v14.8+
  await bree.start()
}

function getJobs() {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res, rej) => {
    try {
      let auth = await verifyAuth(),
        events = await Calendar.getEvents(auth),
        cron

      events.forEach((event) => {
        cron = formatCronDate(event.start)
        jobs.push({
          name: event.id,
          cron: cron,
          worker: {
            workerData: {
              id: event.id,
            },
          },
          path: sendMessageEvent,
        })
      })

      res(true)
    } catch (error) {
      console.error(error)
      rej(error)
    }
  })
}

function formatCronDate(date) {
  try {
    let hour,
      hourArr,
      cron,
      hasHour = false
    // Verifica se possui horas
    let dateArr = date.split('T'),
      dateArr2 = date.split('T')

    //console.log('teste', dateArr, dateArr.length)
    if (dateArr.length == 2) hasHour = true

    date = dateArr[0]
    dateArr = date.split('-')

    //console.log('dataArr', hasHour)

    // Caso o evento seja o dia inteiro, deixarei o aviso com o horário de 08:00
    if (hasHour) {
      hour = dateArr2[1].split('-')[0]
      hourArr = hour.split(':')

      cron = `${hourArr[1]} ${hourArr[0]} ${dateArr[2]} ${dateArr[1]} *`
    } else {
      cron = `0 8 ${dateArr[2]} ${dateArr[1]} *`
    }

    return cron
  } catch (error) {
    console.error(error)
  }
}

async function sendMessageEvent() {
  const { workerData } = require('worker_threads')
  const axios = require('axios').default
  console.log('teste bree')
  console.log('worker data', workerData.id)

  let id = workerData.id

  await axios.get(`http://localhost:5969/calendar/send/event/${id}`)
  //   date,
  //   dateArr,
  //   hourArr,
  //   hourStart,
  //   hourEnd,
  //   text,
  //   location

  // let event = await Calendar.getEvent(id, auth)
  // let start = event.start.date || event.start.dateTime
  // let end = event.end.date || event.end.dateTime

  // if (!event.location) location = ''
  // else location = event.location

  // dateArr = start.split('T')[0]
  // dateArr = dateArr.split('-')
  // date = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`

  // // Verifica se evento possui horario
  // if (event.start.dateTime) {
  //   hourArr = start.split('T')[1].split('-')[0]
  //   hourArr = hourArr.split(':')

  //   hourStart = `${hourArr[0]}:${hourArr[1]}`

  //   hourArr = end.split('T')[1].split('-')[0]
  //   hourArr = hourArr.split(':')

  //   hourEnd = `${hourArr[0]}:${hourArr[1]}`

  //   text = `'${event.summary}' - ${date}\n${event.description}\n${location}\n${hourStart} - ${hourEnd}`
  // } else {
  //   text = `'${event.summary}' - ${date}\n${event.description}\n${location}`
  // }

  // // Envia mensagem para o bot
  // await Bot.sendMessage(text)
}

export async function updateEvent() {
  jobs = []

  // jobs.push({
  //   name: event.id,
  //   cron: '* * * * *',
  //   worker: {
  //     workerData: {
  //       name: 'teste 2',
  //       beep: 'boop',
  //     },
  //   },
  //   path: sendMessageEvent,
  // })

  bree.stop()

  await init()
}

init()
// setTimeout(() => {
//   addJob()
// }, 9000)
