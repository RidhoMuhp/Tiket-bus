import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import 'dotenv/config'

const viteCli = fileURLToPath(new URL('../node_modules/vite/bin/vite.js', import.meta.url))
const serverEntry = fileURLToPath(new URL('../server/index.js', import.meta.url))
const apiPort = process.env.PORT || 3001
const apiHealthUrl = `http://127.0.0.1:${apiPort}/api/trips`

async function isApiRunning() {
  try {
    const response = await fetch(apiHealthUrl, { signal: AbortSignal.timeout(1000) })
    return response.ok
  } catch {
    return false
  }
}

function startProcess(entry) {
  return spawn(process.execPath, [entry], { stdio: 'inherit' })
}

// Jalankan Vite selalu; API hanya dijalankan bila belum aktif.
const processes = [startProcess(viteCli)]
if (await isApiRunning()) {
  console.log(`API Bustara sudah aktif di http://localhost:${apiPort}`)
} else {
  processes.push(startProcess(serverEntry))
}

function stopProcesses() {
  processes.forEach((child) => child.kill())
}

process.once('SIGINT', stopProcesses)
process.once('SIGTERM', stopProcesses)

processes.forEach((child) => {
  child.on('error', (error) => {
    console.error('Gagal menjalankan server:', error.message)
    stopProcesses()
    process.exitCode = 1
  })

  child.on('exit', (code) => {
    if (code && code !== 0) {
      stopProcesses()
      process.exitCode = code
    }
  })
})
