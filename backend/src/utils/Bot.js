import axios from 'axios'

class Bot {
  async sendMessage(text) {
    await axios.post(
      `https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`,
      {
        chat_id: process.env.CHAT_ID,
        text,
      }
    )
  }

  async getLastMessage() {
    try {
      let result = await axios.get(
        `https://api.telegram.org/bot${this.token}/getUpdates`
      )

      result = result.data.result
      result = result[result.length - 1]

      let message = result.message.document
        ? await this.isFile(result.message.document.file_id)
        : await this.isText(result.message.text)

      this.chatId = result.message.chat.id

      await this.decryptMessage(message)
    } catch (error) {
      console.error(error)
    }
  }

  async isFile(fileId) {
    try {
      let dataFile = await axios.get(
        `https://api.telegram.org/bot${this.token}/getFile?file_id=${fileId}`
      )

      dataFile = dataFile.data.result

      let file = await axios.get(
        `https://api.telegram.org/file/bot${this.token}/${dataFile.file_path}`
      )

      return file.data
    } catch (error) {
      console.error(error)
    }
  }

  async isText(text) {
    try {
      console.log(text)
    } catch (error) {
      console.error(error)
    }
  }
}

export default new Bot()
//module.exports = { Operator: new Bot() }
